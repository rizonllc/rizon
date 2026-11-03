"use client";

import { useRef, useState } from "react";
import { Pause, Play, Search } from "lucide-react";
import type { Voice } from "@/lib/voices";
import styles from "./voices.module.css";

const collections = [
  { category: "premade", title: "Pre-made voices" },
  { category: "professional", title: "Professional voices" },
] as const;

export function VoiceLibrary({ voices }: { voices: Voice[] }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  async function toggleVoice(voice: Voice) {
    const player = audio.current;
    if (!player) return;
    setError("");

    if (activeId === voice.id && !player.paused) {
      player.pause();
      return;
    }

    if (activeId !== voice.id) {
      player.src = voice.src;
      setActiveId(voice.id);
    }

    try {
      await player.play();
    } catch {
      setPlaying(false);
      setError(`Could not play ${voice.name}. Please try again.`);
    }
  }

  return (
    <div className={styles.library}>
      <div className={styles.toolbar}>
        <p className={styles.summary}>{voices.length} voices <span aria-hidden>·</span> 2 collections</p>
        <label className={styles.search}>
          <Search size={16} aria-hidden />
          <input
            type="search"
            aria-label="Search voices"
            placeholder="Search name, accent, or style"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <audio
        ref={audio}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setError("This sample could not be loaded. Please try again.");
        }}
      />
      {error && <p role="alert" className={styles.error}>{error}</p>}

      {collections.map(({ category, title }) => {
        const collection = voices.filter((voice) => voice.category === category);
        const matches = collection.filter((voice) =>
          [voice.name, voice.description, voice.gender, voice.language, voice.accent, voice.useCase]
            .join(" ").toLowerCase().includes(normalizedQuery),
        );

        return (
          <section key={category} className={styles.collection} aria-labelledby={`${category}-title`}>
            <div className={styles.heading}>
              <h2 id={`${category}-title`}>{title}</h2>
              <span>{normalizedQuery ? `${matches.length} of ${collection.length}` : collection.length}</span>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <caption className="sr-only">{title} and audio samples</caption>
                <thead>
                  <tr>
                    <th scope="col">Voice</th>
                    <th scope="col" className={styles.details}>Language & accent</th>
                    <th scope="col" className={styles.details}>Best suited for</th>
                    <th scope="col"><span className="sr-only">Listen</span></th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((voice) => {
                    const isPlaying = activeId === voice.id && playing;
                    return (
                      <tr key={voice.id} data-playing={isPlaying || undefined}>
                        <th scope="row">
                          <span className={styles.name}>{voice.name}<span className={styles.gender}>{voice.gender}</span></span>
                          {voice.description && <span className={styles.description}>{voice.description}</span>}
                          <span className={styles.mobileDetails}>{voice.language} · {voice.accent} · {voice.useCase}</span>
                        </th>
                        <td className={styles.details}>{voice.language}<span className={styles.description}>{voice.accent}</span></td>
                        <td className={styles.details}><span className={styles.useCase}>{voice.useCase}</span></td>
                        <td className={styles.preview}>
                          <button
                            type="button"
                            className={styles.play}
                            aria-label={`${isPlaying ? "Pause" : "Play"} ${voice.name}`}
                            aria-pressed={isPlaying}
                            onClick={() => void toggleVoice(voice)}
                          >
                            {isPlaying ? <Pause size={15} fill="currentColor" aria-hidden /> : <Play size={15} fill="currentColor" aria-hidden />}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {matches.length === 0 && <p role="status" className={styles.empty}>No matching voices in this collection.</p>}
            </div>
          </section>
        );
      })}
    </div>
  );
}
