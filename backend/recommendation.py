from typing import List, Dict, Any
import requests
import random
import sys
import json

BASE_URL = 'http://localhost:8000/movies'

def fetch_popular_movies() -> List[Dict[str, Any]]:
    """
    Fetch popular movies from the API.
    """
    try:
        response = requests.get(f'{BASE_URL}?limit=200')
        response.raise_for_status()
        data = response.json()
        return data['movies']
    except Exception as e:
        print(f"Erreur lors de la récupération des films populaires: {e}", file=sys.stderr)
        sys.exit(1)

def prepare_movie_data(movies: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Prepare movie data to extract relevant fields.
    """
    movie_data = []
    for movie in movies:
        movie_data.append({
            'id': movie['id'],
            'name': movie['name'],
            'genres': [genre['id'] for genre in movie['genres']],
            'rating': movie.get('globalrating', 0),
            'directors': [movie['director']['id']] if movie['director'] else [],
            'actors': [actor['id'] for actor in movie['actors']]
        })
    return movie_data

def recommend_movies(user_ratings: Dict[int, bool], movies: List[Dict[str, Any]], num_recommendations: int = 10) -> List[Dict[str, Any]]:
    """
    Recommend movies based on user's ratings and movie data.
    """
    recommendations = []
    user_genres_high = set()
    user_genres_low = set()
    user_directors_high = set()
    user_directors_low = set()
    user_actors_high = set()
    user_actors_low = set()
    added_movie_ids = set()

    # Utiliser les feedbacks de l'utilisateur pour ajuster les scores des films
    for movie_id, user_rating in user_ratings.items():
        for movie in movies:
            if movie['id'] == movie_id:
                if user_rating:
                    user_genres_high.update(movie['genres'])
                    user_directors_high.update(movie['directors'])
                    user_actors_high.update(movie['actors'])
                else:
                    user_genres_low.update(movie['genres'])
                    user_directors_low.update(movie['directors'])
                    user_actors_low.update(movie['actors'])

    for movie in movies:
        if movie['id'] not in user_ratings and movie['id'] not in added_movie_ids:
            common_genres_high = user_genres_high.intersection(set(movie['genres']))
            common_genres_low = user_genres_low.intersection(set(movie['genres']))
            common_directors_high = user_directors_high.intersection(set(movie['directors']))
            common_directors_low = user_directors_low.intersection(set(movie['directors']))
            common_actors_high = user_actors_high.intersection(set(movie['actors']))
            common_actors_low = user_actors_low.intersection(set(movie['actors']))

            genre_score = len(common_genres_high) - len(common_genres_low)
            director_score = len(common_directors_high) - len(common_directors_low)
            actors_score = len(common_actors_high) - len(common_actors_low)

            overall_score = (genre_score + actors_score + director_score * 2) * movie['rating']

            recommendations.append({
                'id': movie['id'],
                'name': movie['name'],
                'score': overall_score
            })
            added_movie_ids.add(movie['id'])

    recommendations.sort(key=lambda x: x['score'], reverse=True)
    return recommendations[:num_recommendations]

if __name__ == "__main__":
    try:
        if len(sys.argv) < 2:
            raise ValueError("Not enough arguments provided. Expected 'recommend'.")

        action = sys.argv[1]

        if action == "recommend":
            if len(sys.argv) < 3:
                raise ValueError("Not enough arguments for 'recommend' action. Expected user ratings JSON.")
            
            print(f"Arguments reçus pour 'recommend': {sys.argv[2]}", file=sys.stderr)
            user_ratings = json.loads(sys.argv[2])
            popular_movies = fetch_popular_movies()
            movie_data = prepare_movie_data(popular_movies)
            recommendations = recommend_movies(user_ratings, movie_data)
            print(recommendations)
            print(json.dumps(recommendations))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
