function refactorTrendingData(
  trending_data: TrendingElemType[]
): AlbumsCardType[] {
  const refactorData = trending_data.map(
    ({
      id,
      image,
      language,
      title,
      type,
      explicit_content,
      perma_url,
      more_info,
    }) => {
      const imageArray = [null, null, { url: image }];
      const songCount =
        type !== "song" ? more_info?.song_count : (more_info as any)?.duration;
      return {
        id,
        image: imageArray,
        language,
        name: title,
        songCount,
        type,
        url: perma_url,
        explicitContent: explicit_content,
      };
    }
  ) as unknown as AlbumsCardType[];
  return refactorData;
}

function secondsToMMSS(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export { refactorTrendingData, secondsToMMSS };
