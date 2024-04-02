import React, { useEffect, useState } from 'react'

import {fetchAllCommentsOfVideo, fetchVideoDetails} from '../../view_models/FetchData.js'

import MyButton from '../../components/MyButton.js';
import Input from '../../components/Input.js';

function HomePage() {

  const [itemsList, setItemsList] = useState([])
  const [randomElement, setRandomElement] = useState({})
  const [videoImg, setVideoImg] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [uploadDate, setUploadDate] = useState('')
  const [numOfComments, setNumOfComments] = useState(0)
  const [videoLink, setVideoLink] = useState("")
  const [keywords, setKeywords] = useState('')
  const [bools , setBools] = useState({
    showComments: false,
    showTools: false,
    showRandomCommentTool: false,
    showRandomCommentResult: false,
    showSpamCommentTool: false,
    showFeedbackAnalysis: false,
  })

  const getVideoDetails = async (videoId)=>{
    if(videoId === '' || videoId.length !== 11){
      alert("please enter a valid link");
    }else{
      const details = await fetchVideoDetails(videoId);      
      setVideoImg(details.thumbnails.maxres.url);
      setVideoTitle(details.title);
      setUploadDate(details.publishedAt.substring(0,10))
      

      const comments = await fetchAllCommentsOfVideo(videoId);
      setItemsList(comments)
      setNumOfComments(comments.length)
      return
    }
  }

  const getVideoId = (videoLink)=>{
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = videoLink.match(youtubeRegex);
      if (match && match[1]) {
        //console.log("match", match[1])
        return match[1];
      } else {
        console.log("video id not found")
        return "";
      }
      // const videoId = videoLink.substring(videoLink.lastIndexOf('=') + 1);
      // return videoId;
  }

  const getRandomElement = (arr)=>{
    const randomIndex = Math.floor(Math.random() * arr.length);
    console.log(arr[randomIndex])
    return arr[randomIndex];
  }

  function getRandomCommentByKeywords(comments, keywords) {
    const keywordsArray = keywords.split(',').map(keyword => keyword.trim().toLowerCase());

    // Filter comments based on keywords
    const matchingComments = comments.filter(comment => {
      const commentText = comment.textDisplay.toLowerCase();
      return keywordsArray.every(keyword => commentText.includes(keyword));
    });

    // Check if there are no matching comments
    if (matchingComments.length === 0) {
      console.log('No comments found with the specified keywords.');
      return null;
    }
    console.log(matchingComments.length)
    // Select a random comment from the filtered list
    const randomIndex = Math.floor(Math.random() * matchingComments.length);
    const randomComment = matchingComments[randomIndex];

    // Check if randomComment is not null before accessing its properties
    if (randomComment) {
      return randomComment;
    } else {
      console.log('Error: Random comment is null.');
      return null;
    }
  }

  const checkRandomComment=(e)=>{
    if(e===null){
      return alert("No such comment found!")
    }else{
      setBools({...bools,showRandomCommentResult: true});
      return setRandomElement(e)
    }
  }

  return (
    <>
          <div className=" bg-semi_dark w-screen h-screen flex justify-center overflow-y-auto  ">
            <div className=" bg-semi_dark w-[70%] h-full shadow-lg  shadow-black flex justify-center overflow-y-auto ">
              <div className=' w-[90%] h-full  flex flex-col'>
                <div className="navbar w-full h-max flex justify-start items-center mt-3">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="70" height="70" viewBox="0 0 48 48">
                    <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                  </svg>
                  <h1 className=' text-3xl font-bold text-primary ml-4'>YT Comment Analyzer</h1>
                </div>
                
                <div className=' w-full h-max flex justify-between'>
                  <div className="w-[65%] h-max flex flex-col justify-center mt-16">
                    <form>
                      <Input isRequired={true}  onChange={(e)=>{setVideoLink(e.target.value)}} value={videoLink} className='' inputClassName=' w-full' hasLabel={true} placeholder='Paste your YouTube link here. ' label='Enter your Youtube video link in the box below: '/>
                      <MyButton disabled={false} label='Get all comments' onClick={()=>{getVideoDetails(getVideoId(videoLink)); setBools({...bools, showTools: true, showComments: true})}} className='mt-4 active:shadow-none hover:translate-y-[-4px] hover:shadow-[0px_5px_0px_0px_#2d3748] active:translate-y-0'/>

                    </form>
                    
                    <h1 className=' text-2xl font-bold text-primary mt-10'>Fetched Details: </h1>
                    
                    <div className=' author font-semibold text-primary text-lg mt-5 flex items-baseline'> 
                      <h1 className=' text-lg font-semibold text-primary '> Title:&nbsp;</h1>
                      <p className=' text-sm font-normal'>{videoTitle}</p>
                    </div>
                    <div className=' author font-semibold text-primary text-lg mt-3 flex items-baseline'> 
                      <h1 className=' text-lg font-semibold text-primary '> Upload date:&nbsp;</h1>
                      <p className=' text-sm font-normal'>{uploadDate}</p>
                    </div>
                    <div className=' author font-semibold text-primary text-lg mt-3 flex items-baseline'> 
                      <h1 className=' text-lg font-semibold text-primary '> Number of comments:&nbsp;</h1>
                      <p className=' text-sm font-normal'>{numOfComments}</p>
                    </div>
                  </div>

                  <div className=" w-[400px] h-[200px] bg-white rounded-md mt-14">
                    <img className='w-max h-max rounded-md' src={videoImg} alt="" />
                  </div>
                </div>
                <>
                  {
                    bools.showTools &&
                    <div className=' tools'>
                      <h1 className=' text-2xl font-bold text-primary mt-16'>Select a tool from below: </h1>
                      <div className='  w-full h-max flex justify-start'> 
                        <MyButton onClick={()=>{setBools({...bools,showRandomCommentTool: !bools.showRandomCommentTool, showSpamCommentTool: false, showFeedbackAnalysis: false})}} disabled={false} className='mt-4 active:shadow-none hover:translate-y-[-4px] hover:shadow-[0px_5px_0px_0px_#2d3748] active:translate-y-0' label='Select random comment'/> 
                        <MyButton onClick={()=>{setBools({...bools,showRandomCommentTool: false, showSpamCommentTool: !bools.showSpamCommentTool, showFeedbackAnalysis: false})}} disabled={false} className='mt-4 ml-3 active:shadow-none hover:translate-y-[-4px] hover:shadow-[0px_5px_0px_0px_#2d3748] active:translate-y-0' label='Detect spam comment'/> 
                        <MyButton onClick={()=>{setBools({...bools,showRandomCommentTool: false, showSpamCommentTool: false, showFeedbackAnalysis: !bools.showFeedbackAnalysis })}} disabled={false} className='mt-4 ml-3 active:shadow-none hover:translate-y-[-4px] hover:shadow-[0px_5px_0px_0px_#2d3748] active:translate-y-0' label='Analyze comments feedback'/> 
                      </div>
                      {bools.showRandomCommentTool &&
                        <div className="mt-2">
                        <div className="w-[70%] h-auto bg-semi_dark shadow-black shadow-lg rounded-lg px-4 ">
                          <Input  onChange={(e)=>{setKeywords(e.target.value); console.log(keywords)}} value={keywords}  className=' mt-5' inputClassName=' w-full' hasLabel={true} placeholder='Type your keyword here ' label='Search for a comment with a keyword below: '/>
                          {/* <MyButton disabled={false} onClick={()=>{setRandomElement(getRandomElement(itemsList)); setBools({...bools,showRandomCommentResult: true});}} className='mt-4 mb-2' label='Get random comment '/>  */}
                          <MyButton disabled={false} onClick={()=>{checkRandomComment(getRandomCommentByKeywords(itemsList, keywords));}} className='mt-4 mb-4 active:shadow-none hover:translate-y-[-4px] hover:shadow-[0px_5px_0px_0px_#2d3748] active:translate-y-0' label='Get random comment '/> 
                          {bools.showRandomCommentResult && 
                            <div className='  h-auto mb-10 flex flex-col p-4 px-6 '>
                              <div className=' h-auto w-full flex justify-start items-center'>
                                <img src={randomElement.authorProfileImageUrl ? randomElement.authorProfileImageUrl : 'https://dogemuchwow.com/wp-content/uploads/2019/09/cursed-cat-image-163325.jpg' } alt="no image" className=' w-8 mr-4 rounded-3xl' />
                                <div className=' author font-bold text-primary text-lg mr-16 flex items-baseline'> 
                                <h1 className=' text-lg font-semibold text-primary '> Author:&nbsp;</h1>
                                <p className=' text-sm font-normal'>{randomElement.authorDisplayName}</p>
                                </div>
                                <div className=' author font-bold text-primary text-lg flex items-baseline'> 
                                <h1 className=' text-lg font-semibold text-primary '> Commented on:&nbsp;</h1>
                                <p className=' text-sm font-normal'>{randomElement.updatedAt}</p>
                                </div>
                              </div>
                              <div className=' author font-bold text-primary text-lg mt-3 flex items-baseline'> 
                                <h1 className=' text-lg font-semibold text-primary '> Comment:&nbsp;</h1>
                                <p className=' text-sm font-normal'>{randomElement.textOriginal}</p>
                              </div>
                            </div>


                          }
                        </div>
                      </div>
                      
                      }
                      {bools.showSpamCommentTool &&
                        <h1 className=' text-white'>detect spam comments</h1>
                      }
                      {bools.showFeedbackAnalysis &&
                        <h1 className=' text-white'>feed back analysis</h1>
                      }
                      
                    </div>
                  }
                  
                </>
                
                {
                  bools.showComments &&
                  <div className=''>
                    <h1 className=' text-2xl font-bold text-primary mt-10'>Comments: </h1>
                    <div className='bg-semi_dark shadow-lg shadow-black mt-4'>
                      {
                        itemsList.map((comment)=>{
                          return(
                            <>
                              
                              <div className='  h-auto mb-10 flex flex-col p-4 px-6 '>
                                <div className=' h-auto w-full flex justify-start items-center'>
                                  <img src={comment.authorProfileImageUrl ? comment.authorProfileImageUrl : 'https://dogemuchwow.com/wp-content/uploads/2019/09/cursed-cat-image-163325.jpg' } alt="" className=' w-8 mr-4 rounded-3xl' />
                                  <div className=' author font-bold text-primary text-lg mr-16 flex items-baseline'> 
                                  <h1 className=' text-lg font-semibold text-primary '> Author:&nbsp;</h1>
                                  <p className=' text-sm font-normal'>{comment.authorDisplayName}</p>
                                  </div>
                                  <div className=' author font-bold text-primary text-lg flex items-baseline'> 
                                  <h1 className=' text-lg font-semibold text-primary '> Commented on:&nbsp;</h1>
                                  <p className=' text-sm font-normal'>{comment.updatedAt}</p>
                                  </div>
                                </div>
                                <div className=' author font-bold text-primary text-lg mt-3 flex items-baseline'> 
                                  <h1 className=' text-lg font-semibold text-primary '> Comment:&nbsp;</h1>
                                  <p className=' text-sm font-normal'>{comment.textOriginal}</p>
                                </div>
                                
                              </div>
                              {/* <div className=' h-[2px] w-full bg-primary my-5'></div> */}
                            </>
                            
                          )
                        })

                      }
                    </div>                  
                  </div>
                }
                               
              </div>             
            </div>
          </div>
        </>
  )
}



export default HomePage



