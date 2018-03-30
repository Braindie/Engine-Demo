
var GameScene =  cc.Scene.extend({


    plane:null,
    targetX:null,
    targetY:null,
    bgImage1:null,
    bgImage2:null,
    winSize:null,
    speedX:null,
    speedY:null,
    action:null,
    layer:null,
    enemies:null,
    gameInfo:null,
    score:0,
    items:null,
    laserCheck:null,
    boss:null,

    ctor:function(){

        this._super();
        this.score = 0;
        this.boss = null;

        this.laserCheck = false;
        var winSize = cc.director.getWinSize();
        this.winSize = winSize;
        //层
        var layer = new cc.Layer();
        layer.bullets=[];
        this.addChild(layer);
        this.layer = layer;

        this.enemies = [];
        //cc.spriteFrameCache.addSpriteFrame("res/img_plane_main.plist");
        //console.log(cc.spriteFrameCache);

                                 
        //背景精灵
        var bgImage1 = new cc.Sprite("res/game_bg1.jpg");
//        var bgSize = bgImage1.getWinSize();
                                 
                                 
        bgImage1.x=winSize.width/2;
        bgImage1.y = winSize.height/2;
        bgImage1.scale = winSize.height/768;//放大比例
        layer.addChild(bgImage1);

        var bgImage2 = new cc.Sprite("res/game_bg1.jpg");
        bgImage2.x=winSize.width/2;
        bgImage2.y = winSize.height/2+winSize.height;
        bgImage2.scale = winSize.height/768;
        layer.addChild(bgImage2);

        this.bgImage1 = bgImage1;
        this.bgImage2 = bgImage2;

                                 
        //飞机层
        //var plane = new cc.Sprite("res/main_plane.png");
        var plane = new Plane(this, layer);
        plane.scale = 0.5;
        this.targetX = plane.x = winSize.width/2;
        this.targetY = plane.y = winSize.height/2;
        layer.addChild(plane,7);
        this.plane = plane;

        //var rotationAction1 = cc.rotateTo(0.01,45);
        //var rotationAction2 = cc.rotateTo(0.01,0);
        //plane.runAction(cc.spawn(rotationAction1,rotationAction2));

                           
        //血量、得分layer
        var gameInfo = new GameInfo(this, layer, plane);
        layer.addChild(gameInfo, 10);
        this.gameInfo = gameInfo;


        this.items = [];

        //触摸事件
        if("touches" in cc.sys.capabilities){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: this._onTouchBegan.bind(this)
            }, this);
        } else {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: this._onMouseDown.bind(this)
            }, this);
        }

        //会调用update
        this.scheduleUpdate();
    },

    //控制飞船移动
    _onTouchBegan:function(touch, event){

        var clickX = touch.getLocation().x;
        var clickY = touch.getLocation().y;

        this.targetX = clickX;
        this.targetY = clickY;
        var speedo = Math.sqrt(Math.pow(clickX-this.plane.x,2)+Math.pow(clickY-this.plane.y,2))/300;
        var moveAction = cc.moveTo(speedo, cc.p(clickX, clickY));

        if(this.action!=null)
            this.plane.stopAllActions();
        this.plane.runAction(moveAction);
        this.action = moveAction;

    },
    //控制飞船移动
    _onMouseDown: function(event){

        var clickX = event.getLocationX();
        var clickY = event.getLocationY();

        this.targetX = clickX;
        this.targetY = clickY;
        var speedo = Math.sqrt(Math.pow(clickX-this.plane.x,2)+Math.pow(clickY-this.plane.y,2))/300;
        var moveAction = cc.moveTo(speedo, cc.p(clickX, clickY));

        if(this.action!=null)
            this.plane.stopAllActions();
        this.plane.runAction(moveAction);
        this.action = moveAction;
    },
                                 
                                 
    update:function(){
        //飞机发射炮弹
        this.plane._shot();
        //敌机出动
        cc.game.enemyManager.addEnemy(this, this.layer, 0.2);
        //cc.game.enemyManager.enemyAttack(this);
        //
        //cc.game.bulletManager.manageBullet(this.layer);
        //cc.game.bulletManager.collisionCheck(this, this.layer);
        //cc.game.bulletManager.updateBulletLocation(this, this.layer, this.plane);
        //cc.game.enemyManager.collisionCheck(this, this.layer, this.plane);
        //cc.game.enemyManager.outEnemyCheck(this, this.layer);
        //
        //this.plane.update();
        //this.gameInfo.update();
        //
        //cc.game.itemManager.generateItem(this, this.layer, this.plane);
        //cc.game.itemManager.collisionCheck(this, this.layer, this.plane);
        //cc.game.itemManager.applyDurableEffect(this, this.layer, this.plane);
        //
        //
        //if(this.plane.blood<=0) {
        //    trace("dead");
        //    cc.director.pause();
        //}
                                 
//        cc.game.stageManager.manageGameStage(this, this.layer, this.plane);

        //背景图片滚动
        this._scrollBackground();
    },

    _scrollBackground:function(){

        this.bgImage1.y -= Math.ceil(this.winSize.height*0.001);
        this.bgImage2.y -= Math.ceil(this.winSize.height*0.001);

        if(this.bgImage1.y<-(this.winSize.height/2)){
            this.bgImage1.y = this.winSize.height/2;
            this.bgImage2.y = this.winSize.height/2+this.winSize.height;
        }
    },


});
