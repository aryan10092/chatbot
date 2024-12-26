import React from 'react'

const Header = () => {
    const chats =[]
  return (
    <div>

        {chats && chats.length === 0 && (
        <p className="text-2xl mb-6 font-semibold ">You are talking to Chathub</p>
      )}
    </div>
  )
}

export default Header