import {BlockType,GameStage,Vect2} from "../../BattleData";
import DisappearHappy from "../../DisappearHappy";

export class BlockView
{
    private m_stPos: Vect2;
    private m_stPrefab: cc.Node;
    private m_stParentNode: cc.Node;

    constructor(Pos: Vect2,parent: cc.Node)
    {
        this.m_stPos = new Vect2(0,0);
        this.m_stPos.x = Pos.x;
        this.m_stPos.y = Pos.y;
        this.m_stParentNode = parent;
    }

    public CreatBlock(): void
    {
        cc.loader.loadRes('block',(error,res) =>
        {
            this.m_stPrefab = cc.instantiate(res);
            this.m_stPrefab.parent = this.m_stParentNode;
            this.SetRender();
            let x = this.m_stPos.x * 60 + DisappearHappy.Logic.BattleData.BasePos.x;
            let y = this.m_stPos.y * 60 + DisappearHappy.Logic.BattleData.BasePos.y;
            this.m_stPrefab.setPosition(x,y);
            this.m_stPrefab.on(cc.Node.EventType.TOUCH_START,this.ClickGridStart,this);
            this.m_stPrefab.on(cc.Node.EventType.TOUCH_END,this.ClickGridEnd,this);
        });
    }

    private SetRender(): void
    {
        if(!this.m_stPrefab)
        {
            return;
        }
        if(DisappearHappy.Logic.BattleData.m_arrBlockMap[this.m_stPos.x][this.m_stPos.y].m_stType == BlockType.BENT)
        {
            this.m_stPrefab.getChildByName("1").active = true;
            this.m_stPrefab.getChildByName("0").active = false;
        }
        else if(DisappearHappy.Logic.BattleData.m_arrBlockMap[this.m_stPos.x][this.m_stPos.y].m_stType == BlockType.STRAIGHT)
        {
            this.m_stPrefab.getChildByName("0").active = true;
            this.m_stPrefab.getChildByName("1").active = false;
        }
        this.SetRot(DisappearHappy.Logic.BattleData.m_arrBlockMap[this.m_stPos.x][this.m_stPos.y].m_stRot);
    }

    private ClickGridStart(): void
    {
        this.m_stPrefab.setScale(1.2,1.2);
    }

    private ClickGridEnd(): void
    {
        this.m_stPrefab.setScale(1,1);
        DisappearHappy.Logic.BattleData.m_arrBlockMap[this.m_stPos.x][this.m_stPos.y].m_stRot += 270;
        DisappearHappy.Logic.BattleData.m_arrBlockMap[this.m_stPos.x][this.m_stPos.y].m_stRot %= 360;
        this.SetRot(DisappearHappy.Logic.BattleData.m_arrBlockMap[this.m_stPos.x][this.m_stPos.y].m_stRot);
        DisappearHappy.Logic.BattleData.m_stStage = GameStage.JUDGMENT;
        console.log("had be click!!",this.m_stPos);
    }

    public SetRot(rot: number): void
    {
        this.m_stPrefab.angle = rot;
    }

    public SetNewPosAndRender(ychange: number): void
    {
        this.SetRender();
        let x = this.m_stPos.x * 60 + DisappearHappy.Logic.BattleData.BasePos.x;
        let y = (ychange + this.m_stPos.y) * 60 + DisappearHappy.Logic.BattleData.BasePos.y;
        this.m_stPrefab.setPosition(x,y);
    }

    public MoveTo(): void
    {
        let x = this.m_stPos.x * 60 + DisappearHappy.Logic.BattleData.BasePos.x;
        let y = this.m_stPos.y * 60 + DisappearHappy.Logic.BattleData.BasePos.y;
        let v2 = new cc.Vec2(x,y);
        let action: cc.ActionInterval = cc.moveTo(1,v2);
        this.m_stPrefab.runAction(action);
    }

    public update()
    {
        this.SetRender();
    }
}
