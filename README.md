# Pepper_imap

This program opens a specific user's email inbox. Functions including:
	- Get the wanted email, read the message out for the user.
	- Showing, Playing different type of attachments: audio, video, picture.
	- Reply to email/ Send new email.

# Program's flow:
## PART 1: Fetch and read emails
### 1. "Get user info" box 

gets the user's name that log in using face recognition from "Start up" application. Then it query the email information based on that name from the database. The data then stored to be used in many different cases later.

### 2. "Check mail" box 

retrieves the user id and pass and login to the mail box. It then checks if there is any new mail. 

2.1 If there are new mails, the program inform the user of the number of new mail, then loops through each new mails and ask user if they want to read the specific mail.

- "Check mail" box stores all of the new mails's unique id, its corresponding sender and subject into a list.

- "Check mail" box triggers output "onStopped" which contains number of new mails -> "New messages" box say it out and asks user if they want to start reading these new emails -> "Confirm" box

	2.1.1 If user want to read new mails
	-> output "output_1" of "Confirm" box
	
	-> input "mail_to_read" of "Check mail box" loop through all mails, store the email's uid into memory and return the emails' sender and subject to the output. 
	
	-> output "out_mail_to_read" 
	
	-> "Say mail info" box say it out and ask user to confirm if they want to read this email
	* If user agrees -> output "output_1" 
		-> "Get mail" box to fetch the whole message of the chosen email and downloads all attachment if any -> SECTION 3
		-> "output_1" also go back to input "reset_Counter" of "Check mail" box so the loop can start again later.
	* If user do not want to read this email -> "Check mail" box's output "output_2" -> "Check mail" box's input "mail_to_read" to start the loops again. The loops keep going until the user finishs reading all the new mails or stop the programs.
	2.1.2 If user do not want to read new mails:
	-> output "output_2" of "Confirm" box
		
	-> "Say: Send email" box ask if user want to send new mail
		
	-> "Confirm" box
	* If user agrees -> output "output_1" -> "Run send email" box run "Send email" application
	* If user do not want to send email -> output "output_2" -> Stop this "Read email" application and go back to "Start up" application
    
2.2 If there is no new mail, the programs ask if the user want to read previous mails or send new mail

-> "Check mail" box triggers output "onNoMail" informs user that he/she has no mail and ask if they want to read previous mail 

-> "Confirm" box
* If user agrees -> "-> output "output_1"
	-> input "check_all" of "Check mail" box is trigger, gets all the emails in inbox and mails's unique id, its corresponding sender and subject into a list.
	Then the loops starts the same as described in SECTION 2.1.1
* If user do not want to read previous mails -> output "output_2" -> "send email" as described in SECTION 2.1.2
    
### 3. "Get mail" get the uid of the chosen uid from the memory, fetch the email
- Output email's body including sender, time, subject and message as a string -> output "onStopped" -> "Say email out loud" box
- Store the above info into memory to be accessed by html file -> output "onShow"-> "Show email" box shows html page in html/index.html
- Check and downloads all attachments to local folder.
- Store list of attachments' name, the value of isMultipart (If there is attachment the value is 1, otherwise it is 0) into memory	-> "Wait for signal" waits for the robot to finish saying the email's info and the data is stored.

	-> "Get mail_multipart" box gets the value of isMultipart to check if the email contains any attachment
	
	-> "Switch case" box
	
	3.1 Case "1" There is attachment
	-> "Ask about attachment" box inform user that the email contains attachment and ask if he/she want to see it.
	
	-> "Confirm" box
	
	* If user agrees -> output "output_1"
		+ "Animated Say" box Pepper informs user that attachments might be heavy and might require sometime to load
		+ "Get attachment" box gets the list of attachments from the memory.
			-> "Extract attachment" box -> see PART 2
	* If user do not want to open attachment -> output "output_2"
			-> "Reply" box -> PART C
      
## PART 2: Open attachments

### 1. "Extract attachment" box 
- catagorize attachments into audio, picture, video or text file using the file's ending.
- Store attachments in seperate lists based on type. 

1.1 If there is single type of attachment.
-> output "onType"
-> "Switch case" proceeds programs depends on attachments' type
	1.1.1 Text
		-> output "output_1" of "Switch case" -> "Text attachment" timeline box
		A. Loop process
			1. "Show attachment list" box shows the list of all attachment on the tablet (html/attachment/text/index.html)
			2.  
		   	- "Subscribe to choose_text" box gets signal if user chooses the text file he/she wants to open through tablet -> "File loop" box (See A.3 below)
		   	- "Read text" box ask if user want to read these text files. -> "Confirm" box
				* If user agrees ->  output "output_1" -> "File loop" box (See A.3 below)
				* If user do not want to read text file -> output "output_2" -> "Reply" box -> PART C
			3."File loop" box: Get the text attachment list from the memory, loops through the attachment list.
			3.1 Start loop
			-> output "out_file_loop" 
			-> "List loop" box tells user the name of the attachment and ask if they want to open that specific one.
			-> "Confirm" box
				* If user agrees -> output "output_1" 
					-> input "file_name" of "File loop" box to get the name of the file (go through this box again so we do not have to store so many thing in the memory) -> output "out_read_text" carries the name of chosen attachment to the next box -> PART B, 1.1.1
				* If user do not want to read this text file -> output "output_2" 
					-> loop back to input "onStart" of "File loop" box -> PART A, 1.1.1
			3.2 End of loop
			When the loop go through all of the attachment files, next turn output "out_end_loop" will be trigger instead of "out_file_loop"
			-> "End list" box informs user that this is the end of the list and ask if the user want to start going through it again.
			-> "Confirm" box
				* If user agrees -> output "output_1" -> Loop back to input "onStart" of "File loop" box -> PART A, 1.1.1
				* If user do not want to continue going through text attachment -> output "output_2"
					-> output "output_reply" of timeline box "text attachment"
					-> "Check other type" box check if there is other type of attachment
					-> In this case there is only one type of attachment -> output "reply" 
					-> "Reply" box -> PART C
		B. Open the file
		- "Say Text File" says the text file out loud. -> loop back to PART A
		- "Tactile Head" box to stop the "Say Text File" if user do not want to listen to that anymore.
		- "Show Text File" shows the text file on the tablet. 
		C. Reply to email
		- "Reply" box: ask if user want to reply to this email.4
		- "Confirm" box
			* If user agrees -> output "output_1" -> "Run send email" box : run "Send emai" application
			* If user do not want to reply to the email -> output "output_2" -> Loop back to "Check mail" box to start checking mail again (see PART 1, 2.1)  
	1.1.2 Audio
		-> output "output_2" of "Switch case" -> "Audio attachment" timeline box
		A. Loop process: Similar to process to SECTION 1.1.1
		1. "Show attachment list" box shows the list of all attachment on the tablet (html/attachment/audio/index.html)
    		2.  
		   - "Subscribe to choose_audio" box gets signal if user chooses the text file he/she wants to open through tablet -> "File loop" box (See A.3 below)
		   - "Play audio" box ask if user want to play these audio files. -> "Confirm" box
			* If user agrees ->  output "output_1" -> "File loop" box (See A.3 below)
			* If user do not want to read text file -> output "output_2" -> "Reply" box -> PART C
		3."File loop" box: Get the audio attachment list from the memory, loops through the attachment list.
			3.1 Start loop
			-> output "out_file_loop" 
			-> "List loop" box tells user the name of the attachment and ask if they want to open that specific one.
			-> "Confirm" box
				* If user agrees -> output "output_1" 
					-> input "file_name" of "File loop" box to get the name of the file (go through this box again so we do not have to store so many thing in the memory) -> output "out_read_text" carries the name of chosen attachment to the next box -> PART B, 1.1.1
				* If user do not want to read this text file -> output "output_2" 
					-> loop back to input "onStart" of "File loop" box -> PART A, 1.1.1
			3.2 End of loop
			When the loop go through all of the attachment files, next turn output "out_end_loop" will be trigger instead of "out_file_loop"
			-> "End list" box informs user that this is the end of the list and ask if the user want to start going through it again.
			-> "Confirm" box
				* If user agrees -> output "output_1" -> Loop back to input "onStart" of "File loop" box -> PART A, 1.1.1
				* If user do not want to continue going through text attachment -> output "output_2"
					-> output "output_reply" of timeline box "audio attachment"
					-> "Check other type" box check if there is other type of attachment
					-> In this case there is only one type of attachment -> output "reply" 
					-> "Reply" box -> PART C
		B. Open the file
			- "Play Sound" box plays the audio file through speaker -> loop back to PART A
			- "Tactile Head" box to stop the "Say Text File" if user do not want to listen to that anymore. 
		C. Reply to email
			See PART 2, 1.1.1 PART C
	1.1.3 Image
		-> output "output_3" of "Switch case" 
		-> "Images attachment" box and "Next_Previous_command" dialog box
			- "Images attachment" box get the image attachment list from the memory and shows it on the tablet (html/attachment/image/index.html)
			- "Next_Previous_command" box listens to command from user:
				1. to view next/previous picture 
				2. to go back to attachment overview page
				3. to end the reading attachment programme
	1.1.4 Video
		-> output "output_5" of "Switch case" -> "Video attachment" timeline box
		A. Loop process: Similar to process to SECTION 1.1.1
			1. "Show attachment list" box shows the list of all attachment on the tablet (html/attachment/audio/index.html)
			2.  
		   	- "Subscribe to choose_audio" box gets signal if user chooses the text file he/she wants to open through tablet -> "File loop" box (See A.3 below)
		   	- "Play video" box ask if user want to play these video files. -> "Confirm" box
				+ If user agrees ->  output "output_1" -> "File loop" box (See A.3 below)
				+ If user do not want to read text file -> output "output_2" -> "Reply" box -> PART C
			3."File loop" box: Get the video attachment list from the memory, loops through the attachment list.
			3.1 Start loop
			-> output "out_file_loop" 
			-> "List loop" box tells user the name of the attachment and ask if they want to open that specific one.
			-> "Confirm" box
				* If user agrees -> output "output_1" 
					-> input "file_name" of "File loop" box to get the name of the file (go through this box again so we do not have to store so many thing in the memory) -> output "out_read_text" carries the name of chosen attachment to the next box -> PART B, 1.1.1
				* If user do not want to read this text file -> output "output_2" 
					-> loop back to input "onStart" of "File loop" box -> PART A, 1.1.1
			3.2 End of loop
			When the loop go through all of the attachment files, next turn output "out_end_loop" will be trigger instead of "out_file_loop"
			-> "End list" box informs user that this is the end of the list and ask if the user want to start going through it again.
			-> "Confirm" box
				* If user agrees -> output "output_1" -> Loop back to input "onStart" of "File loop" box -> PART A, 1.1.1
				* If user do not want to continue going through video attachment -> output "output_2"
					-> output "output_reply" of timeline box "audio attachment"
					-> "Check other type" box check if there is other type of attachment
					-> In this case there is only one type of attachment -> output "reply" 
					-> "Reply" box -> PART C
		B. Open the file
			- "Play Sound" box plays the audio file through speaker -> loop back to PART A
			- "Tactile Head" box to stop the "Say Text File" if user do not want to listen to that anymore. 
		C. Reply to email
			See PART 2, 1.1.1 PART C
	1.1.5 Stop
		-> output "output_4" of "Switch case"
		-> "Reply" box (See PART 2, 1.1.1 PART C)
1.2 If there is multiple types of attachment.
-> output "onShowList" of "Extract attachment" box
-> "Subsribe to choose_attachment" box, "show" box and "Say Attachment options" say box
	1.2.1 "Subscribe to choose_attachment" box: gets signal when user choose attachment type he/she wants to open through tablet.
			-> output "onEvent" ->
				- input "onStop" of "Speech Reco." to stop Pepper from listening to voice input (see 1.2.3 below)
				- output the name of the choosen type to "Switch case" box and start the process based on the type (see PART 2, 1.1)
	1.2.2 "show" box: shows all types of attachmemnt on the tablet 
	1.2.3 "Say Attachment options": Say all types of the attachment out loud
			-> "Speech Reco." listens to user chosen type of attachment to open through voice command.
			-> output "onWordRecognized" ->
				- output the name of the choosen type to "Switch case" box and start the process based on the type (see PART 2, 1.1)
				- loops back to input "onStop" to stop Pepper from listening to voice input (see 1.2.3 below)
