import {BlockLogic} from "../battle/block/BlockLogic";
import {BattleData,Vect2,BlockType} from "../BattleData";
import Block from "./block/Block";
import BlockRender from "./block/BlockRender";

export default class GameLogic
{
    private m_pBattleData: BattleData;
    private m_pBlockLogic: BlockLogic;
    private m_pBlockRender: BlockRender;

    constructor()
    {
    }

    public Init()
    {
        this.m_pBattleData = new BattleData();
        this.m_pBlockLogic = new BlockLogic();
        this.m_pBlockRender = new BlockRender();
        this.BattleData.Init();
        this.SetBlockMessage();
        this.m_pBlockRender.Init();
    }

    public get Render(): BlockRender
    {
        return this.m_pBlockRender;
    }

    public get BattleData(): BattleData
    {
        return this.m_pBattleData;
    }

    private SetBlockMessage(): void
    {
        for(let i = 0;i < this.BattleData.Xsize;i++)
        {
            for(let j = 0;j < this.BattleData.Ysize;j++)
            {
                let type = (Math.floor(Math.random() * 1.5) + 1) % 2;
                let rot = (Math.floor(Math.random() * 3.99) * (-90) + 360) % 360;
                let v2 = new Vect2(i,j);
                let block = new Block(type,rot,v2);
                this.BattleData.m_arrBlockMap[i][j] = block;
            }
        }
    }

    public Tick(): void
    {
        this.m_pBlockLogic.Tick();
        this.Render.Tick();
    }
}
