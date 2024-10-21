// "use client"
// import { HfInference } from "@huggingface/inference";
// import React, { useEffect, useState } from 'react'
// const inference = new HfInference("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");



// export default function Page()  {

//     const [ans, setAns]= useState(null)
//     const [loading, setLoading]=useState(false)
//     useEffect(()=>{
//         // const chat= async()=>{
//         //     setLoading(true)
            
//         //     try{
//         //         const response = await fetch(
//         //             "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
//         //             {
//         //                 headers: {
//         //                     Authorization: "Bearer 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",
//         //                     "Content-Type": "application/json",
//         //                 },
//         //                 method: "POST",
//         //                 body: JSON.stringify({"inputs": "can you give recipe for a sandwitch?"}),
//         //             }
//         //         );
//         //         const result = await response.json();
//         //             setAns(result)
                
//         //     }catch(error){
//         //         console.log("!!!error: ", error)
//         //     }finally{
//         //         setLoading(false)
//         //     }
//         // } 
//         // chat();


//         const chat=async ()=>{
//             setLoading(true)
//             let response= ''
//             for await (const chunk of inference.chatCompletionStream({
//                 model: "microsoft/DialoGPT-large",
//                 messages: [{ role: "user", content: "give me recipe to make a sandwitch" }],
//                 max_tokens: 1000,
//             })) {
//                 response+= chunk.choices[0]?.delta?.content || "";
//                 console.log(chunk)
                
//             }
//             setAns(response)
//             setLoading(false)
//         }

//         chat();
//     },[])
//   return (
//     <div>
//         {loading? <div>Loading...</div>:<div>{JSON.stringify(ans)}</div>}


//     </div>
//   )
// }






