/* TODO : 
    Change api routes to use userId instead of username
    Get token and userId from localstorage/cookies
    New Message Incoming thing(Change colour of new messaged user, add badges with new message count ...)
 */

import styles from './chat.module.scss'
import { Component, createRef } from 'react'
import socketio from 'socket.io-client'
import {showLogin} from '../top'
import ReactDOM from 'react-dom'

let localval, token, username, popupTimeoutId;
const websocketurl = '//codestats-test.herokuapp.com/';
const chaturl = "//codestats-test.herokuapp.com/api/chat/";

function getReciever(chatroom){
    return (chatroom.user1==username)?chatroom.user2:chatroom.user1;
}

class Chat extends Component{
    constructor(props){
        super(props);
        this.messageText = createRef();
        this.searchText = createRef();
        this.chatContainer = createRef();
    }

    state = {
        isLoggedIn : false,
        isChatMinimized : true,
        isMainWindow : true,
        isSearch : false,
        showPopup : false,
        socket : null,
        userList : [],
        messageList : [],
        searchList : [],
        currentChat : ''
    };

    chatSignIn(){
        let storeval = localStorage.getItem('jwt');
        if(storeval == null){
            this.setState({isLoggedIn : false});
            this.setState({socket:null});
            this.setState({isMainWindow:true});
        }
        else{
            localval = JSON.parse(storeval);
            token = localval.token;
            username = localval.user.username;
            popupTimeoutId = null;

            let socket = socketio(websocketurl,{
                query:{token:token}
                });
            this.setState({socket : socket});
            console.log(token, username);
            
            socket.on('connect',()=>{
                // console.log('Connected',socket);
                socket.emit('joinUser',username);
            });
            fetch(chaturl + username,{
                method:'GET',headers:{'Authorization':'Bearer '+ token}
            })
            .then(data => data.json())
            .then(userlist =>{
                // console.log(userlist);
                this.setState({userList:userlist});
                this.setState({isLoggedIn : true});
            })
            .catch(err=>console.log(err));

    /*  When a new message is recieved, if currentChat is same as sender of message, change messageList state
        which calls render() again showing new messages.
    */
            socket.on('newMessage',data=>{
                if(data.sender==this.state.currentChat){
                    this.setState({messageList:[...this.state.messageList,data]});
                }
            });
        }
    }
    componentDidMount(){
        // console.log(this.chatContainer);
        this.chatSignIn();
        /* Add click listener */
        document.addEventListener('mousedown',this.handleClickOutside);
    }

    componentWillUnmount(){
        if(this.state.socket!=null){
            this.state.socket.off('connect');
            this.state.socket.off('newMessage');
        }
        document.removeEventListener('mousedown',this.handleClickOutside);
    }

    componentDidUpdate(){
        if(this.state.isMainWindow == false){
            this.chatContainer.current.scrollIntoView();
        }
        let localval = JSON.parse(localStorage.getItem('jwt'));
        if(this.state.isLoggedIn == true){
            if(localval && localval.user.username != username){
                if(this.state.socket!=null){
                    this.state.socket.off('connect');
                    this.state.socket.off('newMessage');
                    this.setState({socket:null});
                    this.setState({isMainWindow:true});
                }
                this.chatSignIn();
            }
            else if(localval==null){
                this.setState({isMainWindow:true});
                this.setState({isLoggedIn:false});
            }
        }
        else if(this.isLoggedIn==false){
            if(this.state.socket!=null){
                this.state.socket.off('connect');
                this.state.socket.off('newMessage');
                this.setState({socket:null});
                this.setState({isMainWindow:true});
            }
        }
        // console.log("component update", this.chatContainer);
    }

    handleClickOutside = (event)=>{
        const domNode = ReactDOM.findDOMNode(this);
        if(!domNode || !domNode.contains(event.target)){
            this.setState({isChatMinimized:true});
        }
    }
    onClickMinimize = ()=>{
        let storeval = localStorage.getItem('jwt');
        if(storeval == null){
            this.setState({isLoggedIn : false});
            this.setState({socket : null});
        }
        else{
            this.setState({isLoggedIn : true});
        }

        this.setState({isChatMinimized : !this.state.isChatMinimized});
    };

    onClickBack = ()=>{
        this.messageText.current.value = "";
        this.setState({isMainWindow:!this.state.isMainWindow});
    };

/*  Fetches the Chats of User from server if current chat is not same as required chat.
    currentChat is cached in messageList state.
    after fetch, currentChat is updated, along with messageList
*/
    openChat(chatroom){
        this.setState({isMainWindow:false});
        this.setState({showPopup:false});
        clearTimeout(popupTimeoutId);
        let reciever = getReciever(chatroom);
        if(this.state.currentChat != reciever){
            fetch(chaturl + username + '/' + chatroom.id, {
                method:'GET', headers:{'Authorization':'Bearer '+token}
            })
            .then(data => data.json())
            .then(messagesObj =>{
                // console.log(messagesObj);
                if(messagesObj.messages == undefined){
                    this.setState({messageList:[]});
                }
                else{
                    this.setState({messageList:messagesObj.messages});
                }
                this.setState({currentChat:reciever});
            })
            .catch(err=>console.error(err));
        }
    }

/*  Returns Recipient Users with whom user has chats with, to display in render() 
    if isSearch state is set, means that user is searching, so returns the filtered searchList state
    searchList state is updated whenever user searches, so on render() the latest filtered list is displayed
    if isSearch state is not set, all users are displayed
*/
    showUserList(){
        // console.log(this.state.userlist);
        let userlist;
        if(this.state.isLoggedIn == false){
            return (
                <button
                    className={`${this.state.isChatMinimized ? styles['btn-disable'] : styles["login-btn"]}`}
                    onClick={()=>{
                        showLogin();
                        this.setState({isChatMinimized:true});
                        }}
                >LOGIN</button>
            )
        }
        else if(this.state.isSearch==true){
            userlist = this.state.searchList;
        }
        else{
            userlist = this.state.userList;
        }
        userlist = userlist.map((chatroom,index)=>{
            return (
                <button 
                    key={index}
                    onClick={()=>this.openChat(chatroom)}
                    className={`${styles['list-group-item']} ${styles['list-group-item-action']}`}
                    >{getReciever(chatroom)}
                </button>)
        });
        // console.log(userlist);
        return (
            <div className={`${styles['user-container']} ${styles['list-group']}`}>
                {userlist}
            </div>
        )
    }

/*  Returns the Messages from messageList state to display in render() 
    When isMainWindow = false and there are messages in messageList 
*/
    showUserChat(){
        let chatlist = [];
        // console.log("UserList : "+JSON.stringify(this.state.messageList));
        if(this.state.isMainWindow==false && this.state.messageList!=undefined){
            for (let i = 0, l = this.state.messageList.length; i < l; i++) {
                let msgstyle;
                if(this.state.messageList[i].sender == username){
                    msgstyle=styles['message-sender'];
                }
                else{
                    msgstyle=styles['message-reciever'];
                }
                chatlist.push(
                    <div key={i} className={msgstyle}>
                        <div 
                            className={styles['message-elem']}
                        >{this.state.messageList[i].message}</div>
                    </div>
                );
            }
        }
        return (
            <div className={styles['chat-container']}>
                {chatlist}
                <div ref={this.chatContainer} className={styles['chat-container-anchor']}></div>
            </div>
        )
    }

/* Sends Message, can be called by enter key and by pressing send button */
    sendMessage = ()=>{
        if(this.state.currentChat!=''){
            this.state.socket.emit('privateMessage',username,this.state.currentChat,this.messageText.current.value);
            // console.log("Message Sent ",this.state.currentChat,this.messageText.current.value);
            this.setState({messageList:[...this.state.messageList,{"sender":username,"message":this.messageText.current.value}]});
            this.messageText.current.value = "";
        }
    }

/* Calls Function on pressing enter key in search box */
    onEnterKey = (event, callFunction)=>{
        let code = event.code || event.which || event.key || event.keyCode;
        if(code==13)
            callFunction();
    }

/* Search users and sets isSearch if there is search string */
    searchUser = (event)=>{
        // console.log(this.searchText.current.value);
        this.setState({showPopup:false});
        clearTimeout(popupTimeoutId);

        let code = event.code || event.which || event.key || event.keyCode;
        if(code==13){
            this.startNewChat();
        }
        if(this.searchText.current.value != ''){
            let searchlist = this.state.userList.filter(chatroom => {
                let reciever = getReciever(chatroom);
                return reciever.startsWith(this.searchText.current.value);
            });
            // console.log(searchlist);
            this.setState({searchList:searchlist});
            this.setState({isSearch:true});
        }
        else{
            this.setState({searchList:[]});
            this.setState({isSearch:false});
        }
    }

    /* Start a new chat or go to existing chat if found */
    startNewChat = ()=>{
        // console.log(this.searchText);
        if(this.searchText.current.value=='' || this.searchText.current.value==username){
            this.setState({showPopup:true},()=>{
                popupTimeoutId = setTimeout(()=>{
                    this.setState({showPopup:false})},1500);
            });
        }
        else if(this.searchText.current.value == this.state.currentChat){
            this.searchText.current.value = "";
            this.setState({isMainWindow:false});
        }
        else{
            fetch(chaturl + username,{
                method : 'POST',
                headers : {
                    'Authorization' : 'Bearer '+token,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({"to":this.searchText.current.value})
            })
            .then(data=>{
                if(data.status==404){
                    this.setState({showPopup:true},()=>{
                        setTimeout(()=>this.setState({showPopup:false}),1500);
                    });
                    let err = new Error();
                    err.name = 'NotFoundError';
                    throw err;
                }
                else{
                    return data.json();
                }
            })
            .then(chatroom=>{
                // console.log(this.state.userList.concat([chatroom]));
                this.setState({userList:this.state.userList.concat([chatroom])});
                this.setState({isMainWindow:false});
                this.setState({currentChat:getReciever(chatroom)});
                this.searchText.current.value = "";
            })
            .catch(err=>{
                if(err.name != 'NotFoundError')
                    console.log(err);
            });
        }
    }

    render() {
        const {isChatMinimized, isMainWindow, showPopup, isLoggedIn} = this.state;
        return (

            <div className={`${styles['window']} ${isChatMinimized ? styles['minimized']:""}`}>
            {/* Navigation bar with Minimize and Back buttons */}
                <nav className={styles['window-controls']} >
                    <div 
                        className={`${isChatMinimized ? styles['disable']:styles['minimize']}`} 
                        onClick={this.onClickMinimize} 
                    ></div>
                    <div 
                        className={`${styles['maximizeChat']} ${isChatMinimized ? styles['maximize']:styles['disable']}`}  
                        onClick={this.onClickMinimize} 
                    >Chats</div>	
                    <div 
                        className={`${styles['back']} ${(isMainWindow || isChatMinimized)? styles['disable']:""}`} 
                        onClick={this.onClickBack}></div>
                </nav>
                
                {/* Main Window with user List */}
                <aside className={`${styles['window-sidebar']} ${isMainWindow ? "":styles['disable']}`} >
                    <div className={`${isLoggedIn ? styles["input-group"] : styles['disable']}`}>
                        <input 
                            ref={this.searchText}
                            type="text" 
                            className={`${isLoggedIn ? styles["form-control"] : styles['disable']}`}
                            placeholder="Search Users"
                            onKeyUp={this.searchUser}
                        />
                        <div className={`${styles['popover']} ${styles['popover-bottom']} ${showPopup ?"":styles['disable']}`}>
                            <div className={`${styles['arrow']}`}></div>
                            <div className={`${styles['popover-body']}`}>Enter Valid Username</div>
                        </div>
                    </div>
                    {this.showUserList()}
                    <button 
                        className={`${(isChatMinimized || !isLoggedIn) ? styles['btn-disable'] : styles['send-message']}`}
                        onClick={this.startNewChat}
                        >
                        <i className={`${styles['add-chat-icon']} fas fa-plus`}></i>
                    </button>
                </aside>

                {/* Window with Chat Content */}
                <section className={`${(isChatMinimized || !isLoggedIn) ? styles['disable'] : styles['window-content']}`}>
                    <div className={styles['top-wrapper']}>{this.state.currentChat}</div>
                    {this.showUserChat()}
                    <div className={styles['bottom-wrapper']}>
                        <input 
                            ref={this.messageText}
                            className={styles['input-message']}
                            onKeyUp={(e)=>this.onEnterKey(e,this.sendMessage)}
                        ></input>
                        <button 
                            className={styles['send-message']}
                            onClick={this.sendMessage}
                        >
                            <i className={`${styles['send-icon']} fa fa-paper-plane`}></i>
                        </button>
                    </div>
                </section>
            </div>
        );
    };
}

export default Chat;