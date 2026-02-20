
import React, { useState, useRef } from 'react';
import { Mic, Square, Trash2, Volume2, Loader2 } from 'lucide-react';

interface AudioRecorderProps {
  onRecordingComplete: (base64Audio: string | null) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const base64 = await blobToBase64(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        
        setAudioUrl(url);
        onRecordingComplete(base64);
        setIsProcessing(false);
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('ไม่สามารถเข้าถึงไมโครโฟนได้');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const deleteRecording = () => {
    setAudioUrl(null);
    onRecordingComplete(null);
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-rose-50 rounded-lg">
          <Mic className={`w-5 h-5 ${isRecording ? 'text-rose-600 animate-pulse' : 'text-rose-400'}`} />
        </div>
        <h4 className="font-bold text-gray-800">บันทึกเสียงเพิ่มเติม (Voice Note)</h4>
      </div>

      {isProcessing ? (
        <div className="flex items-center justify-center py-4 gap-2 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">กำลังประมวลผลไฟล์เสียง...</span>
        </div>
      ) : !audioUrl ? (
        <div className="flex flex-col items-center justify-center py-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="group flex items-center gap-3 bg-rose-50 hover:bg-rose-100 text-rose-600 px-6 py-3 rounded-2xl transition-all border border-rose-100"
            >
              <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold">เริ่มบันทึกเสียง</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-3 bg-rose-600 text-white px-6 py-3 rounded-2xl animate-pulse shadow-lg shadow-rose-200"
            >
              <Square className="w-5 h-5 fill-current" />
              <span className="font-bold">หยุดบันทึก</span>
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex-1 flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-blue-500" />
            <audio src={audioUrl} controls className="h-8 flex-1" />
          </div>
          <button onClick={deleteRecording} className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
