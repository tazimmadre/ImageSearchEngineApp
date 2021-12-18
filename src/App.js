import "./App.css";
import React from 'react';
import {imageapi} from './api';
import Swal from 'sweetalert2';
import { LazyLoadImage, trackWindowScroll } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      tags:'nature',
      resp:[]
    };
  }
  componentDidMount(){
    this.getapi();
  }
  renderedData=()=>{
    if(this.state.resp.length>0){
      return this.state.resp.map(({farm,server,id,secret,title})=>{
        const imgSrc = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
        return (
          <div className="card" key={id} onClick={this.openModal.bind(this,title,imgSrc)}>
              <LazyLoadImage
                src={imgSrc}
                alt={title}
                scrollPosition={this.props.scrollPosition}
                effect='blur'
              />
            <div className="content">
              <div className="description">{title}</div>
            </div>
          </div>
        );
          })
          }else{
            return <div><h1 className='header'>Loading...</h1></div>;
          }
    }
    getapi(){
      imageapi
        .get("", {
          params: {
            tags: this.state.tags,
          },
        })
        .then((r) => {
          this.setState({ resp: r.data.photos.photo });
        })
        .catch((e) => console.log(e));
    }
    onSubmitHandle(e){
      e.preventDefault();
      this.getapi();
    }
    inputHandle(e){
      this.setState({tags:e.target.value})
    }
    openModal(t,i){
      Swal.fire({
        title:t,
        imageUrl:i,
        showCloseButton:true, 
      })
    }

  render(){
            return (
              <div>
                <form onSubmit={this.onSubmitHandle.bind(this)}>
                  <div className="ui fluid action input">
                    <input
                      type="text"
                      placeholder="Search..."
                      onChange={this.inputHandle.bind(this)}
                    />
                    <div className="ui button" onClick={this.getapi.bind(this)}>
                      Search
                    </div>
                  </div>
                </form>
                <br />
                <div className="ui link centered cards">
                  {this.renderedData()}
                </div>
              </div>
            );
  }
}

export default trackWindowScroll(App);
