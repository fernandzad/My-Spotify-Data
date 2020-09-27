const clientId: string = process.env.REACT_APP_CLIENT_ID || '';
const clientSecret: string = process.env.REACT_APP_CLIENT_SECRET || '';

export const _getToken = async () => {
  if (clientId !== '' && clientSecret !== '') {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      },
      body: 'grant_type=client_credentials',
    });
    const data = await result.json();
    return data.access_token;
  }
};

export const _getMyUserId = async (token: string) => {
  const result = await fetch(`https://api.spotify.com/v1/me`, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });

  const data = await result.json();
  return data;
}

export const _getMyPlaylists = async (token: string, userId: string) => {
  const limit = '5';
  const result = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}`, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });

  const data = await result.json();
  return data.items;
}

export const _getGenres = async (token: string) => {
  const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });

  const data = await result.json();
  return data.categories.items;
};

export const _getPlaylistByGenre = async (token: string, genreId: string) => {
  const limit = 10;

  const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });

  const data = await result.json();
  return data.playlists.items;
};

export const _getTracks = async (token: string, tracksEndPoint: string) => {
  const limit = 10;

  const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });

  const data = await result.json();
  return data.itemsracks;
};

export const _getTrack = async (token: string, trackEndPoint: string) => {
  const result = await fetch(`${trackEndPoint}`, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });

  const data = await result.json();
  return data;
};