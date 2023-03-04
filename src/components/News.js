import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  articles=[];
  constructor(){
  super();
  this.state={
    articles:this.articles,
    loading:false,
    page:1
  }
  }
  static defaultProps = {
    Country:'in',
    category:'general'
  }
  static propTypes = {
    Country:PropTypes.string,
    category:PropTypes.string
  }
  async updateNews(){
    this.props.setProgress(10);
    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=feaa70665ff645f09922b97bedca7e86&page=${this.state.page}&pageSize=15`;
    this.setState({loading:true})
    //
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedata= await data.json();
    this.props.setProgress(70);
    this.setState({articles:parsedata.articles,totalResults:parsedata.totalResults,loading:false})
    this.props.setProgress(100);

  }
  async componentDidMount(){
  this.updateNews();
  

  }
    fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=feaa70665ff645f09922b97bedca7e86&page=${this.state.page}&pageSize=15`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedata= await data.json();
    this.setState({articles:this.state.articles.concat(parsedata.articles),
      totalResults:parsedata.totalResults,
      loading:false
    })


  };
  render() {
      
    return  <>
        <h2 style={{textAlign: 'center'}}>NewsMonkey Top Headlines  by OM </h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner />}
        >
          
             <div className="row my-4">
             <div className="container my-3 "   style={{marginLeft: "8%"}}></div>
                {this.state.articles.map((element)=>{
                    return <div className="col-md-3" key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,90):"There is no description for perticular News "} imageUrl={element.urlToImage?element.urlToImage:"https://cdn.cnn.com/cnnnext/dam/assets/220130175535-miss-usa-cheslie-kryst-died-super-tease.jpg"} newsUrl={element.url}/>
                    </div>
                })}
              </div>
              </InfiniteScroll>
              
           
    </>;
  }
}
