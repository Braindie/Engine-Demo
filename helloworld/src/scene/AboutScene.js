

var AboutScene = cc.Scene.extend({


    ctor:function(){

        this._super();
        var winSize = cc.director.getWinSize();
                                 
        //layer
        var layer = new cc.Layer();
        this.addChild(layer);
                                 
                                 
                                 
                                 
        var aboutText = "你好，小青蛙，欢迎进入游戏启动界面，马上你就可以跳了\n";
        aboutText += "Go Go Go...";

        var aboutLabel = new cc.LabelTTF(aboutText, "Arial",24);
        aboutLabel.x = winSize.width/2;
        aboutLabel.y = winSize.height-300;
        layer.addChild(aboutLabel);

        this.scheduleOnce(function(){

            var gameScene = new GameScene();
            cc.director.runScene(gameScene);
            cc.game.gameScene = gameScene;

        },3);

    }


});
