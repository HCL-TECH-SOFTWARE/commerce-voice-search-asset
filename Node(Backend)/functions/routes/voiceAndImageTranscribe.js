/**
*==================================================
Copyright [2021] [HCL Technologies]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*==================================================
**/
var Client = require('node-rest-client').Client;
const express = require('express');
const router = express.Router();

let client = new Client();


router.post('/voice-transcribe', (req, res) => {
  const speechURL = "https://speech.googleapis.com/v1/speech:recognize";
  const { audioBytes } = req.body;

  if (!audioBytes) {
    return res.status(422).send({ error: 'Please provide audio in base64 format' });
  }
  let dataObj = {
    config: {
      encoding: "LINEAR16",
      languageCode: "en-US",
      model: "default"
    },
    audio: {
      content: audioBytes
    }
  }

  transcribeData(dataObj, speechURL, res);

});

/*
  Method to call the Google Api and get the result
*/
const transcribeData = (dataObj, URL, res) => {
  let args = {
    data: dataObj,
    parameters: { key: process.env.GOOGLE_SPEECH_VISION_API_KEY },
    headers: { "Content-Type": "application/json" }
  };

  let request = client.post(URL, args, (data, response) => {
    const transcribeText = JSON.stringify(data);
    return res.status(200).send(transcribeText);;
  });

  request.on('error', (err) => {
    return res.status(500).send({ error: err.message });
  })
}

module.exports = router;