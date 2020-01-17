import React, {Component} from 'react';
import './EzibuyMap.css';

class EzibuyMap extends Component{

    constructor(props){
      super(props)
      this.onScriptLoad = this.onScriptLoad.bind(this)
      this.checkMap = this.checkMap.bind(this)
    }

    onScriptLoad() {
      const map = new window.google.maps.Map(
        document.getElementById(this.props.id),
        this.props.options
      );

      this.props.onMapLoad(map)
    }

    componentDidMount() {
      this.checkMap()
    }
    update = new Boolean(true)

    checkMap() {
      if(!window.google) {
        var s = document.createElement('script');
        s.type = 'text/javascript'
        s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyA7eMioAQ3MA9GxvxlmbesRoB6RZ2ugGhw'
        document.head.insertBefore(s,null)
        s.addEventListener('load', e=> {
          this.onScriptLoad()
        })

      }else {
        this.onScriptLoad()
      }
    }


    render() {
      console.log("render in map!")
      //this.checkMap()

        if((this.props.lat != 4.657248 || this.props.lng != -74.099235) && this.update){
          this.checkMap()
          this.update = false
        }
        
        return (
          
         
          <div id={this.props.id} className="sellproductmap"></div>
        
        );
      }
}

export default EzibuyMap




  