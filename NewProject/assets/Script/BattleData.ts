import Block from "./battle/block/Block";
import DisappearHappy from "./DisappearHappy";

export class BattleData
{
    public readonly Xsize = 10;
    public readonly Ysize = 20;
    public readonly BasePos = new Vect2(-270,-570);
    public m_stStage: GameStage;
    public m_arrBlockMap: Array<Array<Block>>;

    constructor()
    {
        this.m_stStage = GameStage.PLAY;
        this.m_arrBlockMap = [];
        for(let i = 0;i < this.Xsize;i++)
        {
            this.m_arrBlockMap[i] = [];
        }
    }

    public Init(): void
    {

    }
}

export enum BlockType
{
    STRAIGHT = 0,
    BENT = 1,
}

export class Vect2
{
    x: number;
    y: number;

    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}

export enum GameStage
{
    PLAY = 0,
    JUDGMENT = 1,
    MOVE = 2,
}
