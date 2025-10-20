export type GameTypeId = string; // will be narrowed when endpoint provided

export interface GameItem {
  gameID: string;
  gameName: string;
  gameTypeID: GameTypeId;
  technology: string;
  platform: string;
  firstSeenAt: string; // ISO string
}

export interface GameListResponse {
  result: GameItem[];
}
