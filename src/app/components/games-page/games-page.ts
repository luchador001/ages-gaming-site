import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language';
import { translations } from '../../i18n/translations';

type GameCategory = 'puzzle' | 'adventure' | 'idle' | 'coop';
type FilterKey = 'all' | GameCategory;

const FEATURED_IMAGE = 'media/games/dragon-isles-cozy-skies.webp';

const CARD_IMAGES: Record<string, string> = {
  'bubble-bloom': 'media/games/bubble-bloom.webp',
  'sky-trail-runners': 'media/games/sky-trail-runners.webp',
  'tiny-tavern-tycoon': 'media/games/tiny-tavern-tycoon.webp',
  'cloud-kitchen-crew': 'media/games/cloud-kitchen-crew.webp',
  'rune-and-ribbon': 'media/games/rune-and-ribbon.webp',
  'dragon-isles-2': 'media/games/dragon-isles-2.webp',
};

@Component({
  selector: 'app-games-page',
  imports: [RouterLink],
  templateUrl: './games-page.html',
  styleUrl: './games-page.scss',
})
export class GamesPage {
  private readonly language = inject(LanguageService);

  protected readonly t = computed(() => translations[this.language.lang()]);

  protected readonly featuredImage = FEATURED_IMAGE;

  protected readonly activeFilter = signal<FilterKey>('all');

  protected readonly filterOptions = computed(() => {
    const filters = this.t().gamesPage.filters;
    return [
      { key: 'all' as const, label: filters.all },
      { key: 'puzzle' as const, label: filters.puzzle },
      { key: 'adventure' as const, label: filters.adventure },
      { key: 'idle' as const, label: filters.idle },
      { key: 'coop' as const, label: filters.coop },
    ];
  });

  protected readonly filteredCards = computed(() => {
    const filter = this.activeFilter();
    const cards = this.t().gamesPage.cards;
    return filter === 'all' ? cards : cards.filter((card) => card.category === filter);
  });

  protected setFilter(filter: FilterKey): void {
    this.activeFilter.set(filter);
  }

  protected categoryLabel(category: GameCategory): string {
    return this.t().gamesPage.filters[category];
  }

  protected cardImage(id: string): string {
    return CARD_IMAGES[id] ?? FEATURED_IMAGE;
  }
}
