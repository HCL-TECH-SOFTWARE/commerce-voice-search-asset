# Voice Search

## WARRANTY & SUPPORT 
HCL Software provides HCL Commerce open source assets “as-is” without obligation to support them nor warranties or any kind, either express or implied, including the warranty of title, non-infringement or non-interference, and the implied warranties and conditions of merchantability and fitness for a particular purpose. HCL Commerce open source assets are not covered under the HCL Commerce master license nor Support contracts.

If you have questions or encounter problems with an HCL Commerce open source asset, please open an issue in the asset's GitHub repository. For more information about [GitHub issues](https://docs.github.com/en/issues), including creating an issue, please refer to [GitHub Docs](https://docs.github.com/en). The HCL Commerce Innovation Factory Team, who develops HCL Commerce open source assets, monitors GitHub issues and will do their best to address them. 

## HCLC Voice-Search Integration Asset

**It provides the capability to search HCL Commerce Catalog using voice search on React Stores.**


**Prerequisites:** HCL Commerce V9.1.x / HCL Commerce React Storefront SDK

We have used following components to achieve the voice search

**React Audio Analyser** - Used to record audio. 

**Google Speech API** - Used to convert audio to text.

**Note**

The library **react-audio-analyser** used for recording audio, doesn't support in IOS chrome and safari as this library uses HTML5 Media Recorder APIs “getUserMedia and MediaRecorder” which are not supported by chrome and safari in IOS. So we have hide voice search button for IOS.

Supported Browser are Windows (Chrome, Firefox), Mac (Chrome,  Firefox), Android (Chrome) 

If supports need to provide for iOS/Mac(safari), the Paid library(react-mic-gold) can be used for audio recording.


## UI
**Steps to include the Voice search in your project:**
1. You need to install the react audio anayser in your project as a dependency.

   `npm install react-audio-analyser –save`
   
    Once installation is done. Verify the entry  in your package.json file.
    For icons used,install iconify icons
    
    `npm install @iconify/react @iconify/icons-mdi`

2. In your Search Bar Widget,import the search-type.tsx and used it as component

    ` import { SearchTypes } from "../Search-types/search-types";`

    `  <SearchTypes showSpeechToText={true} setSearchBoxVal={setInput} />`

3. We have created the firebase API to call the google speech API.The call to the firebase API is placed in the **voiceImageTranscribeService**
   Host the Node Code on the firebase and use the Firebase hosted URL for the API in voiceImageTranscribeService.ts
   `const VOICE_URL = "Your Firebase API URL"`
   
4. Once All steps are done, Voice search will start working.

## Node(Backend)
  On the Firebase side, Google Speech API is used for converting audio(i.e wav file) to text.
   
  For Google Speech API to Work,Follow these steps

  -Need to create the project on "https://console.cloud.google.com/"
  -Enable Billing
  
  -Enable Google Vision API
  
  -setup autentication 
  
  -create service account
  
  -User service key in firebase .env file
  
  Once you get the Google Key,add it in .env file placed inside **Node(backend)/functions** folder
  
  
  **Reference**
  
  For more details,refer the voiceSearch_technical.docx file
 
  

