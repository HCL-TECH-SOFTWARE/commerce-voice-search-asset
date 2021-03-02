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
require('dotenv').config();
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/voiceAndImageTranscribe');

const app = express();

app.use(cors({ origin: true }));
app.use(authRoutes);


  
exports.app = functions.https.onRequest(app);