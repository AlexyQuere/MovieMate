from typing import List, Dict, Any, Set
import requests
import random

BASE_URL = 'http://localhost:8000/movies'

def fetch_popular_movies() -> List[Dict[str, Any]]:
    """
    Fetch popular movies from the API.
    """
    response = requests.get(f'{BASE_URL}?limit=200')  # Assuming the API supports limiting results
    response.raise_for_status()
    data = response.json()
    return data['movies']  # Assuming the key is 'movies'

def prepare_movie_data(movies: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Prepare movie data to extract relevant fields.
    """
    movie_data = []
    for movie in movies:
        movie_data.append({
            'id': movie['id'],
            'name': movie['name'],
            'genres': [genre['id'] for genre in movie['genres']],  # List of genre IDs
            'rating': movie['globalrating'],  # Rating of the movie
            'directors': [movie['director']['id']] if movie['director'] else [],  # Director ID if available
            'actors': [actor['id'] for actor in movie['actors']]  # List of actor IDs
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

    # Update sets based on user's ratings
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

    # Generate recommendations based on user preferences
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

def get_random_movies(movies: List[Dict[str, Any]], num_samples: int = 10) -> List[Dict[str, Any]]:
    """
    Get a random selection of movies.
    """
    return random.sample(movies, num_samples)

def get_user_feedback_for_movies(movies: List[Dict[str, Any]]) -> Dict[int, bool]:
    """
    Simulate getting user feedback for a list of movies.
    """
    user_ratings = {}
    for movie in movies:
        print(f"Do you like the movie '{movie['name']}'? (y/n)")
        response = input().strip().lower()
        user_ratings[movie['id']] = (response == 'y')
    return user_ratings

# Main execution
popular_movies = fetch_popular_movies()
movie_data = prepare_movie_data(popular_movies)

# Select 10 random movies from the top 200 to get user feedback
random_movies = get_random_movies(movie_data, 10)
print("Please rate the following movies:")

user_ratings = get_user_feedback_for_movies(random_movies)

recommendations = recommend_movies(user_ratings, movie_data)
print("\nRecommended Movies:")
for rec in recommendations:
    print(f"Recommended Movie ID: {rec['id']}, Title: {rec['name']}, Score: {rec['score']}")
