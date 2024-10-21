// 'use client'
// import React,{useState,useEffect} from "react";
// import { Box } from "@mui/material";


// export default function Chatbot(){
//     const [answer,setAnswer]= useState(null)
//     const OPENROUTER_API_KEY='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'
//     useEffect(()=>{
//         const chat= async()=>{
//             const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//                 method: "POST",
//                 headers: {
//                   "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
//                   "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                   "model": "meta-llama/llama-3.1-8b-instruct:free",
//                   "messages": [
//                     {"role": "user", "content": "What is the meaning of life?"},
//                   ],
//                 })
//               });

//               const data= await response.json();
//               console.log("bot response: "+data)
//               setAnswer(data);
              
//         }
//         chat();
//     },[])

//     return(
//         <Box>
//             {JSON.stringify(answer)}
//             {/* role:{answer.choices[0]?.message?.role|| "NA"}
//             answer is: {answer.choices[0]?.message?.content || "NA"} */}
//         </Box>
//     )

// }



