import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth0 } from '../auth/react-auth0-wrapper'

import useGetToken from '../utils/useGetToken'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import * as types from 'actions/actionTypes'
import PostForm from './PostForm'
import PostCard from './PostCard'

const PostsContainer = props => {
  const { loginWithRedirect } = useAuth0()
  // Fetches Auth0 token for axios call
  const { posts, memberType, group } = props

  // Create ref and scrollToBottom function to align view upon entering tab and on new posts
  const postsEndRef = useRef(null)

  const scrollToBottom = () => {
    if (postsEndRef.current) {
      postsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const userIn = useSelector(state => state.userReducer.loggedInUser)
  if (userIn) {
    return (
      <PostsWrapper>
        {/* {(membership === 'admin' || memberType === 'member') && (
          <PostForm groupId={props.groupId} scrollToBottom={scrollToBottom} />
        )} */}

        <div ref={postsEndRef} />

        {(memberType === 'admin' || memberType === 'member') && (
          <PostForm groupId={props.groupId} scrollToBottom={scrollToBottom} />
        )}

        <PostListContainer>
          {posts.length > 0 ? (
            posts.map(post => {
              return <PostCard post={post} key={post.id} group={group} />
            })
          ) : (
            <PaperContainer elevation={20}>
              <h2>Nobody has posted yet!</h2>
            </PaperContainer>
          )}
        </PostListContainer>
      </PostsWrapper>
    )
  } else {
    return (
      <PostsWrapper>
        <PostListContainer>
          <JoinBtn onClick={() => loginWithRedirect({})}>
            LOG IN TO JOIN THE CONVERSATION!
          </JoinBtn>
          {posts.length > 0 ? (
            posts.map(post => {
              return <PostCard post={post} key={post.id} group={group} />
            })
          ) : (
            <PaperContainer elevation={20}>
              <h2>Nobody has posted yet!</h2>
            </PaperContainer>
          )}
        </PostListContainer>
        <div ref={postsEndRef} />

        {(memberType === 'admin' || memberType === 'member') && (
          <PostForm groupId={props.groupId} scrollToBottom={scrollToBottom} />
        )}
      </PostsWrapper>
    )
  }
}

const PostListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  background-color: #dee4e7;
  // padding-bottom: 15%;
`
const PostsWrapper = styled.div`
  background-color: #dee4e7;
`
const PaperContainer = styled(Paper)`
  padding: 3.5rem;
`
const JoinBtn = styled.button`
  height: 54px;
  width: 192px;
  border: none;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  color: white;
  background: #ed5959;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  @media (max-width: 500px) {
    width: 90vw;
  }
`

export default PostsContainer
