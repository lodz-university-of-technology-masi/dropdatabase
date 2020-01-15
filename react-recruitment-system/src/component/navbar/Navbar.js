import React, {useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./Navbar.css";
import {Link} from "react-router-dom";
import {
  CANDIDATE_LIST_PATH,
  CREATE_TEST_PATH,
  HOME_PATH,
  LOGIN_PATH,
  SCORES_PATH,
  PROFILE_PATH,
  ANSWERS_PATH,
  REGISTER_PATH
} from "../../constants";
import {AppContext} from "../../main/App";

export const Navbar = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const {state, dispatch} = useContext(AppContext);

  /**
   * Render single nav item
   * @param path - path to the page
   * @param value - text to display in nav item
   * @param isLogout - if true then value in context isUserLoggedIn
   * is set to false - user is logout
   * @returns {*}
   */
  const renderNavItem = (path, value, isLogout) => {
    return (
      <li className="nav-item">
        <Link
          to={path}
          className="nav-link"
          onClick={isLogout ? props.handleLogout : null}
        >
          {value}
        </Link>
      </li>
    );
  };
    
    const getSynonym = (text) => {
        axios.get( "https://n5608yixy5.execute-api.us-east-1.amazonaws.com/dictionary/synonym", {
         params:{
           "text": text,
            "lang": "pl-ru"   
          }
        })
        .then((res) => {
          console.log(res);
             document.getElementById('synonym-output').innerHTML="";
            var h5 = document.createElement("h5");          
            var textnode = document.createTextNode("Synonyms for: "+text);   
            h5.appendChild(textnode);    
            document.getElementById('synonym-output').appendChild(h5);      
            var ul = document.createElement("ul");           
            res.data.synonyms.map((it)=>{
                var li = document.createElement("LI");           
                var textnode = document.createTextNode(it);       
                li.appendChild(textnode);   
                ul.appendChild(li);   
            });
            if(res.data.synonyms.length == 0){
                
                var li = document.createElement("LI");           
                var textnode = document.createTextNode("no synonyms");       
                li.appendChild(textnode);   
                ul.appendChild(li);  
            }
            document.getElementById('synonym-output').appendChild(ul);
        })
        .catch((err) => {
          alert(err.message)
        });
    }
    
    const getTranslate = (text, lang) => {
        axios.get( "https://n5608yixy5.execute-api.us-east-1.amazonaws.com/dictionary/translate", {
         params:{
           "text": text,
            "lang": (lang==1)?"pl-en":"en-pl"   
          }
        })
        .then((res) => {
          console.log(res);
             document.getElementById('translate-output').innerHTML="";
            var h5 = document.createElement("h5");          
            var textnode = document.createTextNode("Translate for: "+text);   
            h5.appendChild(textnode);    
            document.getElementById('translate-output').appendChild(h5);      
            var ul = document.createElement("ul");   
                 
            if(res.data.length == 0){
                
                var li = document.createElement("LI");           
                var textnode = document.createTextNode("no synonyms");       
                li.appendChild(textnode);   
                ul.appendChild(li);  
            }else{
                var li = document.createElement("LI");           
                var textnode = document.createTextNode(res.data);       
                li.appendChild(textnode);   
                ul.appendChild(li); 
            }
            document.getElementById('translate-output').appendChild(ul);
        })
        .catch((err) => {
          alert(err.message)
        });
    }
    
    const showHide = (id) => {
        if(id==1){
            if(document.getElementById('hide-text').innerHTML == "&lt;"){
                document.getElementById('synonym').style.left="-250px";
                document.getElementById('hide-text').innerHTML = "&gt;";
            }else{
                document.getElementById('synonym').style.left="0";
                document.getElementById('hide-text').innerHTML = "&lt;";            
            }       
        }else{
            if(document.getElementById('hide-text-2').innerHTML == "&lt;"){
                document.getElementById('translate').style.left="-250px";
                document.getElementById('hide-text-2').innerHTML = "&gt;";
            }else{
                document.getElementById('translate').style.left="0";
                document.getElementById('hide-text-2').innerHTML = "&lt;";            
            }       
        }
        
    }
    
    const renderSynonym = () => {
        return(
            <div className='bar'>
                <div className='card text-center' id="synonym">
                    <div className='hide card' onClick={()=>{showHide(1)}}><span id="hide-text">&lt;</span></div>
                        <h3>Find synonym</h3>
                        <input type='text' className='form-control' id='synonym-input'/>
                        <button className='btn btn-outline-dark' onClick={()=>{getSynonym(document.getElementById('synonym-input').value)}}>Submit</button>
                    <div id='synonym-output'></div>
                </div>
                <div className='card text-center' id="translate">
                    <div className='hide card' onClick={()=>{showHide(2)}}><span id="hide-text-2">&lt;</span></div>
                        <h3>Translate</h3>
                        <input type='text' className='form-control' id='translate-input'/>
                        <div className="row" style={{marginLeft: "5px"}}>
                            <button className='btn btn-outline-dark col-md-5' onClick={()=>{getTranslate(document.getElementById('translate-input').value, 1)}}>PL > EN</button>
                            <button className='btn btn-outline-dark col-md-5' onClick={()=>{getTranslate(document.getElementById('translate-input').value, 2)}}>EN > PL</button>
                        </div>
                    <div id='translate-output'></div>
                </div>
            </div>
        )
    }

  /**
   * If user is logged in then return CreateTestPage, if not return Login and Register
   * @param isUserLoggedIn - if true user is logged in
   * @param isRecruiter - if true user is a Recruiter - has additional options
   * @returns {*}
   */
  const renderNavItemList = (isUserLoggedIn, isRecruiter) => {
    if (isUserLoggedIn && isRecruiter) {
      return (
        <>
          {renderNavItem(CREATE_TEST_PATH, "Create Test")}
          {renderNavItem(REGISTER_PATH, "Register User")}
          {renderNavItem(PROFILE_PATH, "Account")}
          {renderNavItem(CANDIDATE_LIST_PATH, "Candidates")}
          {renderNavItem(ANSWERS_PATH, "Answers")}
          {renderNavItem(LOGIN_PATH, "Logout", true)}
        </>
      );
    } else if (isUserLoggedIn && !isRecruiter) {
      return (
        <>
          {renderNavItem(PROFILE_PATH, "Account")}
          {renderNavItem(SCORES_PATH, "Scores")}
          {renderNavItem(LOGIN_PATH, "Logout", true)}
        </>
      );
    } else {
      return (
        <>
          {renderNavItem(LOGIN_PATH, "Login")}
        </>
      )
    }
  };

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <nav className="navbar navbar-expand-lg navbar-dark mdb-color">
      <Link to={HOME_PATH} className="navbar-brand">
        {props.msg}
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navList" aria-controls="navList"
              aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>

      <div className="collapse navbar-collapse" id="navList">
        <ul className="navbar-nav ml-auto">
          {renderNavItemList(state.isUserLoggedIn, Boolean(Number(state.userAccountType)))}
        </ul>
      </div>
        {renderSynonym()}
    </nav>
  );
};

Navbar.propTypes = {
  handleLogout: PropTypes.func,
};

export default Navbar;
