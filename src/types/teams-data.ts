export type TeamsData = {
  name: string
  shortName: string
  address: string
  clubColors: string
  crest: string
  founded: number
  id: number
  tla: string
  venue: string
  website: string
  series?: number[]
  averageGoals?: number
}

export type StandingData = {
  position: number
  team: TeamsData
  playedGames: number
  form: string
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}
