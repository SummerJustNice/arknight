//=============================================================================
// myMouse.js
// Version: 1.0
//=============================================================================

var myMouse = myMouse || {};

//=============================================================================
/*:
* @plugindesc 鼠标移动和鼠标事件交互
*
* @author 替罪羊
*
* @param NoteTag
* @desc 点击触发事件的注释
* @default click
*/

//取消鼠标点击的闪光
Spriteset_Map.prototype.createLowerLayer = function() {
Spriteset_Base.prototype.createLowerLayer.call(this);
this.createParallax();
this.createTilemap();
this.createCharacters();
this.createShadow();
// this.createDestination();
this.createWeather();
};


//战斗状态
//建立状态窗口
function Window_MapStatus() {
    this.initialize.apply(this, arguments)
}
Window_MapStatus.prototype = Object.create(Window_Base.prototype);
Window_MapStatus.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
}
Window_MapStatus.prototype.drawCost = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText("cost:", x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + 84, y, 36, 'right');
};
//建立卡牌窗口
function Window_MapCard() {
    this.initialize.apply(this, arguments)
}
Window_MapCard.prototype = Object.create(Window_Base.prototype);
Window_MapCard.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
}

Game_Player.prototype.canMove = function() {
    if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
        return false;
    }
    if (this.isMoveRouteForcing() || this.areFollowersGathering()) {
        return false;
    }
    if (this._vehicleGettingOn || this._vehicleGettingOff) {
        return false;
    }
    if (this.isInVehicle() && !this.vehicle().canMove()) {
        return false;
    }
    if ($gameSwitches.value(1)==true)
    {
        return false;
    }
    return true;
};

var sub1 = Scene_Map.prototype.start
Scene_Map.prototype.start = function () {
    sub1.apply(this,arguments);
    this.createStatusWindow();
    this._StatusWindow.hide();
};

var sub2 = Scene_Map.prototype.update
Scene_Map.prototype.update = function () {
    sub2.apply(this,arguments);
    if ($gameSwitches.value(1)==true)
    {
        this._StatusWindow.show();
        this._CardWindow.show();
        this._StatusWindow.drawCost();
    }
    else
    {
        this._StatusWindow.hide();
        this._CardWindow.hide();
    }
    
    
};

//创建一个显示名字的窗口
Scene_Map.prototype.createStatusWindow = function () {
    this._StatusWindow = new Window_MapStatus(776, 504, 40, 40);
    this.addWindow(this._StatusWindow);
    this._CardWindow = new Window_MapCard(0, 544, 816, 80);
    this.addWindow(this._CardWindow);
};