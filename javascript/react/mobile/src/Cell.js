import React, {Component} from 'react';
import Hammer from 'react-hammerjs';
import './Cell.css'

class Cell extends Component {

    constructor(){
        super(...arguments);
        this.handleTap = this.handleTap.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
        this.handleSwipeRight = this.handleSwipeRight.bind(this);
        this.state = {
            scene:1
        }
    }

    handleSwipeRight(){
        if( this.state.scene > 1 ){
            this.setState({
                scene : this.state.scene - 1
            });
        }
    }

    handleSwipeLeft(){
        if( this.state.scene < 4 ){
            this.setState({
                scene : this.state.scene + 1
            });
        }
    }

    handleTap(value) {
        this.setState({
            scene:value
        });
    }

    handleClick(value){
        this.setState({
            scene:value
        });
    }

    render() {
        const scene_classname = "current_scene"+ this.state.scene;
        return (
            <Hammer
                onTap={this.handleTap}
                onSwipeLeft={this.handleSwipeLeft}
                onSwipeRight={this.handleSwipeRight}
            >
                <div className="cell_outer">
                <div className={"cell_inner "+scene_classname}>
                    <div className="cell cell_1">
                        <h2>cell_1</h2>
                    <p className="next" onClick={(e) => this.handleClick(2)}>次へ</p>
                    </div>
                    <div className="cell cell_2">
                        <h2>cell_2</h2>
                    <p className="next" onClick={(e) => this.handleClick(3)}>次へ</p>
                    </div>
                    <div className="cell cell_3">
                        <h2>cell_3</h2>
                    <p className="next" onClick={(e) => this.handleClick(4)}>次へ</p>
                    </div>
                    <div className="cell cell_4">
                        <h2>cell_4</h2>
                    <p className="next"onClick={(e) => this.handleClick(5)}>次へ</p>
                    </div>
                </div>
                </div>
            </Hammer>
        )
    }
}

export default Cell;
