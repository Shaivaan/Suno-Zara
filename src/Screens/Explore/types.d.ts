interface AlbumPlaylistCarouseParentType{
    type : string
}

type AlbumsCardType = {
  data : {
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
}

interface CardLabelSectionCompType{
    label1?:string
    label2?:string
}
