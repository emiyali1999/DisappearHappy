import GameLogic from "./battle/GameLogic";

export default class DisappearHappy
{
    private static readonly m_pInstance: DisappearHappy = new DisappearHappy();
    private m_iFrameNumber: number;
    private static m_pGameLogic: GameLogic;

    constructor()
    {
        this.m_iFrameNumber = 0;
    }

    public Init(): void
    {
        DisappearHappy.m_pGameLogic = new GameLogic();
        DisappearHappy.Logic.Init();
    }

    public static Get(): DisappearHappy
    {
        return this.m_pInstance;
    }

    public static get Logic(): GameLogic
    {
        return DisappearHappy.m_pGameLogic;
    }

    public Tick(): void
    {
        DisappearHappy.Logic.Tick();
    }
}
