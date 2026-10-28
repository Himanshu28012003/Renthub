
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  user: any = {};
  myListings: any[] = [];

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    try {
      this.user = JSON.parse(
        localStorage.getItem('user') || '{}'
      );

      const properties = JSON.parse(
        localStorage.getItem('properties') || '[]'
      );

      if (!Array.isArray(properties)) {
        this.myListings = [];
        return;
      }

      // Show only listings posted by the logged-in user.
      this.myListings = properties.filter(
        (property: any) =>
          property.ownerEmail &&
          property.ownerEmail === this.user.email
      );
    } catch {
      this.user = {};
      this.myListings = [];
    }
  }

  deleteListing(id: number): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this listing? This action cannot be undone.'
    );

    if (!confirmed) {
      return;
    }

    try {
      const properties = JSON.parse(
        localStorage.getItem('properties') || '[]'
      );

      if (!Array.isArray(properties)) {
        alert('Unable to load your listings.');
        return;
      }

      // Delete only if the listing belongs to this user.
      const listing = properties.find(
        (property: any) =>
          Number(property.id) === Number(id) &&
          property.ownerEmail === this.user.email
      );

      if (!listing) {
        alert('Listing not found or you do not own this listing.');
        this.loadProfile();
        return;
      }

      const updatedProperties = properties.filter(
        (property: any) =>
          !(
            Number(property.id) === Number(id) &&
            property.ownerEmail === this.user.email
          )
      );

      localStorage.setItem(
        'properties',
        JSON.stringify(updatedProperties)
      );

      // Remove the deleted listing from favourites too.
      const favourites = JSON.parse(
        localStorage.getItem('renthub-favourites') || '[]'
      );

      if (Array.isArray(favourites)) {
        localStorage.setItem(
          'renthub-favourites',
          JSON.stringify(
            favourites.filter(
              (favouriteId: number) =>
                Number(favouriteId) !== Number(id)
            )
          )
        );
      }

      this.loadProfile();
      alert('Listing deleted successfully!');
    } catch {
      alert('Unable to delete the listing. Please try again.');
    }
  }
}
