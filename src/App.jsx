import { useState } from 'react'
import './App.css'

const cards = [
  {
    step: 1,
    title: 'Écrire le Dockerfile',
    icon: '📝',
    command: 'FROM node:22-alpine AS builder',
    explanation: "On définit la recette de construction de l'image : quel environnement de base utiliser, quels fichiers copier, quelles commandes exécuter.",
  },
  {
    step: 2,
    title: 'Construire l\'image',
    icon: '🔨',
    command: 'docker build -t mon-app:1.0 .',
    explanation: "Docker lit le Dockerfile et exécute chaque instruction pour fabriquer une image autonome, contenant l'application et tout son environnement.",
  },
  {
    step: 3,
    title: 'Vérifier l\'image',
    icon: '📦',
    command: 'docker images',
    explanation: "On liste les images stockées localement pour confirmer que la construction a réussi, avec leur taille et leur identifiant.",
  },
  {
    step: 4,
    title: 'Lancer le conteneur',
    icon: '🚀',
    command: 'docker run -d -p 80:80 --name demo mon-app:1.0',
    explanation: "On démarre un conteneur à partir de l'image, en reliant le port de la machine au port du conteneur pour le rendre accessible.",
  },
  {
    step: 5,
    title: 'Observer les logs',
    icon: '📋',
    command: 'docker logs -f demo',
    explanation: "On suit en temps réel l'activité du conteneur : requêtes reçues, erreurs éventuelles, démarrage des services internes.",
  },
  {
    step: 6,
    title: 'Explorer le conteneur',
    icon: '🔍',
    command: 'docker exec -it demo sh',
    explanation: "On ouvre un terminal directement à l'intérieur du conteneur, pour inspecter les fichiers ou déboguer si besoin.",
  },
  {
    step: 7,
    title: 'Déployé !',
    icon: '🐳',
    command: 'curl http://74.248.18.114',
    explanation: "L'application est accessible depuis n'importe où, avec la garantie qu'elle se comporte exactement pareil que sur la machine de développement.",
  },
]

function App() {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = cards[index]

  const goTo = (newIndex) => {
    setFlipped(false)
    setIndex(newIndex)
  }

  const next = () => goTo((index + 1) % cards.length)
  const prev = () => goTo((index - 1 + cards.length) % cards.length)

  return (
    <div className="app">
      <div className="scanline" />
      <header className="header">
        <span className="eyebrow">// flashcards de déploiement</span>
        <h1>Déploiement Docker <span className="accent">+ Demo</span></h1>
      </header>

      <div className="progress">
        {cards.map((c, i) => (
          <span
            key={c.step}
            className={`progress-dot ${i === index ? 'active' : ''} ${i < index ? 'done' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className="card-scene" onClick={() => setFlipped(!flipped)}>
        <div className={`card ${flipped ? 'flipped' : ''}`}>
          <div className="card-face card-front">
            <span className="card-step">Étape {card.step} / {cards.length}</span>
            <span className="card-icon">{card.icon}</span>
            <h2>{card.title}</h2>
            <span className="card-hint">clique pour voir la commande</span>
          </div>
          <div className="card-face card-back">
            <span className="card-step">Étape {card.step} / {cards.length}</span>
            <code className="card-command">{card.command}</code>
            <p className="card-explanation">{card.explanation}</p>
          </div>
        </div>
      </div>

      <div className="nav">
        <button className="nav-btn" onClick={prev}>← Précédent</button>
        <button className="nav-btn primary" onClick={next}>Suivant →</button>
      </div>
    </div>
  )
}

export default App