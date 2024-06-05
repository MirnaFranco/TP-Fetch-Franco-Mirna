document.addEventListener('DOMContentLoaded', () => {
    const pokemonListDiv = document.getElementById('pokemon-list');

//Función para obtener la lista de Pokémon
    const fetchPokemonList = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150'); // Se puede ajustar el límite según lo necesario
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const pokemonDetailsPromises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
            const pokemonDetails = await Promise.all(pokemonDetailsPromises);
            displayPokemonList(pokemonDetails);
        } catch (error) {
            pokemonListDiv.innerHTML = '<p>Hubo un problema al obtener la lista de Pokémon.</p>';
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

//Función para mostrar la lista de Pokémon en el DOM
    const displayPokemonList = (pokemonList) => {
        pokemonListDiv.innerHTML = '';
        pokemonList.forEach(pokemon => {
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');
            pokemonCard.innerHTML = `
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
                <p><strong>ID:</strong> ${pokemon.id}</p>
                <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                <p><strong>Habilidades:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
            `;
            pokemonListDiv.appendChild(pokemonCard);
        });
    };

    fetchPokemonList();
});
