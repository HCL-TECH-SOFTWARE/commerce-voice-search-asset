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
import React from "react";
import { Icon, InlineIcon } from "@iconify/react";
import microphoneIcon from "@iconify/icons-mdi/microphone";
import stopCircleOutline from "@iconify/icons-mdi/stop-circle-outline";
import AudioAnalyser from "react-audio-analyser";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import voiceImageTranscibeService from "../../../_foundation/apis/search/voiceImageTranscibe.service";
import { isBrowser, isFirefox, browserVersion, isIOS } from "react-device-detect";

interface VoiceToTextProps {
  setSearchBox(val: any): any;
}
const VoiceToText: React.FC<VoiceToTextProps> = (props: any) => {
  const [status, setStatus] = React.useState("");
  const [hideClass, setHideClass] = React.useState("hidden");
  const [spinner, setSpinner] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  /**Voice Search */

  const startRecording = (e) => {
    setStatus("recording");
    setHideClass("");
    props.setSearchBox("");
  };

  const stopRecording = () => {
    setSpinner(true);
    setStatus("inactive");
    setHideClass("hidden");
    setOpen(false);
  };
  const startCallback = e => {
    console.log("Recording Started");
  };
  const stopCallback = e => {
    console.log("succ stop", e);
    var reader = new FileReader();
    reader.readAsDataURL(e);
    reader.onloadend = () => {
      let base64 = new String(reader.result).split(",")[1];
      if (isBrowser && isFirefox && browserVersion >= '78') {
        speechToText(base64, 2);
      } else {
        speechToText(base64, 1);
      }

    };
  };

  const handleErrorInRecording = (err) => {
    console.log("error", err);
    alert("MediaAPI(getUserMedia) is not supported in your browser");
    setOpen(false);
  }

  const speechToText = async (base64Audio, channelCount) => {
    try {
      const res = await voiceImageTranscibeService.getVoiceTranscribeText(
        base64Audio, channelCount
      );
      console.log("RESPONSE RECEIVED: ", res);
      res.data.results
        ? props.setSearchBox(res.data.results[0].alternatives[0].transcript)
        : props.setSearchBox("No Data Found");
      setSpinner(false);
    } catch (err) {
      console.log("ERROR: ", err);
      setSpinner(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>

      { !isIOS && (
        <span className="icon" onClick={handleClickOpen}>
          <Icon icon={microphoneIcon} width="22px" height="24px" />
        </span>
      )}

      {spinner ? (
        <span className="spinner-box">
          <CircularProgress />
        </span>
      ) : null}


      <Dialog maxWidth='md' className="speechToText-dialog" onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogContent>
          <div id="micWave">
            <AudioAnalyser
              audioType="audio/wav"
              status={status}
              startCallback={startCallback}
              stopCallback={stopCallback}
              errorCallback={handleErrorInRecording}
              width={300}
              height={50}
              strokeColor="#009874"
              // className={`canvas-box1 ${hideClass}`}
              backgroundColor="#FFFFFF"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} className="btn-group">
            {status === "" || status === "inactive" ? (

              <span className="icon" onClick={startRecording}>
                <Icon icon={microphoneIcon} width="40px" height="44px" />
                <div>Press to Speak</div>
              </span>
            ) : (
                <span className="icon" onClick={stopRecording}>
                  <Icon icon={stopCircleOutline} width="40px" height="44px" />
                </span>
              )}
          </div>


        </DialogContent>
      </Dialog>
    </>
  );
};
export default VoiceToText;
