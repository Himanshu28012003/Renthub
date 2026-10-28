
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink,DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  search = '';
  maxRent: number | null = null;
  showFavourites = false;

  sortBy = 'newest';
  currentPage = 1;
  pageSize = 3;
  carouselIndex = 0;

  apartments = [
    {
      id: 1,
      title: 'Modern 2 BHK Apartment',
      city: 'Noida',
      address: 'Sector 62',
      rent: 18000,
      area: 1100,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      description: 'Spacious apartment near the metro station.',
      amenities: ['Parking', 'Gym', 'Power Backup']
    },
    {
      id: 2,
      title: 'Comfortable Studio',
      city: 'Ghaziabad',
      address: 'Indirapuram',
      rent: 9000,
      area: 500,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      description: 'A comfortable studio for students.',
      amenities: ['Wi-Fi', 'Parking']
    },
    {
      id: 3,
      title: 'Luxury Family Apartment',
      city: 'Delhi',
      address: 'Dwarka',
      rent: 25000,
      area: 1400,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
      description: 'A spacious home for families.',
      amenities: ['Garden', 'Security', 'Parking']
    }
  ];

  // Load saved favourites safely.
  favourites: number[] = this.loadFavourites();

  loadFavourites(): number[] {
    try {
      const saved = JSON.parse(
        localStorage.getItem('renthub-favourites') || '[]'
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  // Combine sample listings and user-posted properties.
  get allApartments(): any[] {
    try {
      const saved = JSON.parse(
        localStorage.getItem('properties') || '[]'
      );

      return [
        ...this.apartments,
        ...(Array.isArray(saved) ? saved : [])
      ];
    } catch {
      return [...this.apartments];
    }
  }

  // Search, rent filter, favourites and sorting.
  get filteredApartments(): any[] {
    let result = this.allApartments.filter(apartment => {
      const text = [
        apartment.title || '',
        apartment.city || '',
        apartment.address || ''
      ].join(' ').toLowerCase();

      const matchesSearch = text.includes(
        this.search.trim().toLowerCase()
      );

      const matchesRent =
        this.maxRent == null ||
        Number(apartment.rent) <= Number(this.maxRent);

      const matchesFavourite =
        !this.showFavourites ||
        this.favourites.includes(Number(apartment.id));

      return matchesSearch && matchesRent && matchesFavourite;
    });

    if (this.sortBy === 'rentLow') {
      result.sort((a, b) => Number(a.rent) - Number(b.rent));
    } else if (this.sortBy === 'rentHigh') {
      result.sort((a, b) => Number(b.rent) - Number(a.rent));
    } else if (this.sortBy === 'areaHigh') {
      result.sort((a, b) => Number(b.area) - Number(a.area));
    } else {
      result.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return result;
  }

  // Pagination.
  get totalPages(): number {
    return Math.max(
      1,
      Math.ceil(this.filteredApartments.length / this.pageSize)
    );
  }

  get pages(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  get paginatedApartments(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;

    return this.filteredApartments.slice(
      start,
      start + this.pageSize
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  updateFilters(): void {
    this.currentPage = 1;
  }

  // Featured carousel.
  get featuredApartments(): any[] {
    return this.allApartments.slice(0, 3);
  }

  get currentFeaturedApartment(): any | null {
    const featured = this.featuredApartments;

    if (featured.length === 0) {
      return null;
    }

    return featured[this.carouselIndex % featured.length];
  }

  nextFeatured(): void {
    const length = this.featuredApartments.length;

    if (length > 0) {
      this.carouselIndex = (this.carouselIndex + 1) % length;
    }
  }

  previousFeatured(): void {
    const length = this.featuredApartments.length;

    if (length > 0) {
      this.carouselIndex =
        (this.carouselIndex - 1 + length) % length;
    }
  }

  // Add or remove favourites.
  toggleFavourite(id: number): void {
    if (this.favourites.includes(id)) {
      this.favourites = this.favourites.filter(
        item => item !== id
      );
    } else {
      this.favourites = [...this.favourites, id];
    }

    localStorage.setItem(
      'renthub-favourites',
      JSON.stringify(this.favourites)
    );
  }
}
