
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("星球大战", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
                                    
        var gameNameAction = cc.moveTo(3,size.width/2,size.height-400);
        helloLabel.runAction(gameNameAction);
        
                                      
                                      
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite("res/bg.png");
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 4
        });
        this.addChild(this.sprite, 0);
                                      
        this.scheduleOnce(function(){
            this.showMenu();
        }.bind(this),3);
                                      
                                      
//                                      showMenu:function(){
//                                      var startGameButton = new cc.MenuItemImage("res/startgame2.png", "res/startgame2.png", this.startGame, this);
//                                      var menu = new cc.Menu(startGameButton);
//                                      this.addChild(menu);
//                                      }
//
//                                      startGame:function(){
//                                      trace('Game start..');
//                                      }


        return true;
    }
                                      
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

