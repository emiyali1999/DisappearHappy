import {BattleData,Vect2} from "../../BattleData"
import DisappearHappy from "../../DisappearHappy";
import Block from "./Block";
import {BlockView} from "./BlockView";

export default class BlockRender
{
    private m_stRenderNode: cc.Node;
    private m_stPointPanel: cc.Node;
    private m_arrBlockViewMap: Array<Array<BlockView>>;

    constructor()
    {
    }

    public Init(): void
    {
        this.m_arrBlockViewMap = [];
        for(let i = 0;i < DisappearHappy.Logic.BattleData.Xsize;i++)
        {
            this.m_arrBlockViewMap[i] = [];
        }
        this.m_stRenderNode = cc.find('Canvas').getChildByName('blocknode');
        this.m_stPointPanel = cc.find('Canvas').getChildByName('point');
        for(let i = 0;i < DisappearHappy.Logic.BattleData.Xsize;i++)
        {
            for(let j = 0;j < DisappearHappy.Logic.BattleData.Ysize;j++)
            {
                this.m_arrBlockViewMap[i][j] = new BlockView(new Vect2(i,j),this.m_stRenderNode);
                this.m_arrBlockViewMap[i][j].CreatBlock();
            }
        }
    }

    public ChangeRender(x: number,y: number,h: number): void
    {
        this.m_arrBlockViewMap[x][y].SetNewPosAndRender(h);
        this.m_arrBlockViewMap[x][y].MoveTo();
    }

    public get Node(): cc.Node
    {
        return this.m_stRenderNode;
    }

    public Tick(): void
    {
        for(let i = 0;i < DisappearHappy.Logic.BattleData.Xsize;i++)
        {
            for(let j = 0;j < DisappearHappy.Logic.BattleData.Ysize;j++)
            {
                this.m_arrBlockViewMap[i][j].update();
            }
        }
        this.m_stPointPanel.getComponent(cc.Label).string = DisappearHappy.Logic.BattleData.m_iPoint.toString();
    }
}
