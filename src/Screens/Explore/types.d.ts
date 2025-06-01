interface AlbumPlaylistCarouseParentType{
    type : string
}

type AlbumsCardType = {
      id: string
      name: string
      type: string
      image: Array<{
          quality: string
          url: string
      }>
      url: string
      songCount: number
      language: string
      explicitContent: boolean
  }  

interface CardLabelSectionCompType{
    label1?:string
    label2?:string
}

interface TrendingElemType{
  id: string
  title: string
  subtitle: string
  header_desc: string
  type: string
  perma_url: string
  image: string
  language: string
  year: string
  play_count: string
  explicit_content: string
  list_count: string
  list_type: string
  list: string
  more_info: {
    release_date: string
    song_count: string
    artistMap: {
      primary_artists: Array<any>
      featured_artists: Array<any>
      artists: Array<{
        id: string
        name: string
        role: string
        image: string
        type: string
        perma_url: string
      }>
    }
  }
  modules: any
  button_tooltip_info: Array<any>
}

