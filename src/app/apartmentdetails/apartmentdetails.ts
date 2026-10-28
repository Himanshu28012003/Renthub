import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apartment-details',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './apartmentdetails.html',
  styleUrl: './apartmentdetails.css'
})
export class ApartmentDetails {

  apartment: any;

  commentText = '';
  replyText = '';
  replyingTo: number | null = null;

  comments: any[] = [];

  isFavourite = false;
  interestSent = false;

  constructor(private route: ActivatedRoute) {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    const sampleApartments = [
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

    const savedProperties = JSON.parse(
      localStorage.getItem('properties') || '[]'
    );

    this.apartment = [
      ...sampleApartments,
      ...savedProperties
    ].find(property => property.id === id);

    if (this.apartment) {
      this.loadApartmentData();
    }
  }

  loadApartmentData() {
    const favourites: number[] = JSON.parse(
      localStorage.getItem('renthub-favourites') || '[]'
    );

    this.isFavourite = favourites.includes(this.apartment.id);

    const interests: number[] = JSON.parse(
      localStorage.getItem('renthub-interests') || '[]'
    );

    this.interestSent = interests.includes(this.apartment.id);

    const allComments = JSON.parse(
      localStorage.getItem('renthub-comments') || '{}'
    );

    this.comments = allComments[this.apartment.id] || [];
  }

  toggleFavourite() {
    let favourites: number[] = JSON.parse(
      localStorage.getItem('renthub-favourites') || '[]'
    );

    if (favourites.includes(this.apartment.id)) {
      favourites = favourites.filter(
        id => id !== this.apartment.id
      );

      this.isFavourite = false;
    } else {
      favourites.push(this.apartment.id);
      this.isFavourite = true;
    }

    localStorage.setItem(
      'renthub-favourites',
      JSON.stringify(favourites)
    );
  }

  expressInterest() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      alert('Please login to express interest.');
      return;
    }

    let interests: number[] = JSON.parse(
      localStorage.getItem('renthub-interests') || '[]'
    );

    if (!interests.includes(this.apartment.id)) {
      interests.push(this.apartment.id);

      localStorage.setItem(
        'renthub-interests',
        JSON.stringify(interests)
      );
    }

    this.interestSent = true;

    alert('Your interest has been recorded.');
  }

  addComment() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      alert('Please login to comment.');
      return;
    }

    if (!this.commentText.trim()) {
      alert('Please enter a comment.');
      return;
    }

    const comment = {
      id: Date.now(),
      text: this.commentText.trim(),
      author: JSON.parse(
        localStorage.getItem('user') || '{"name":"User"}'
      ).name,
      replies: []
    };

    this.comments.push(comment);

    this.saveComments();

    this.commentText = '';
  }

  startReply(commentId: number) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      alert('Please login to reply.');
      return;
    }

    this.replyingTo =
      this.replyingTo === commentId ? null : commentId;

    this.replyText = '';
  }

  addReply(commentId: number) {
    if (!this.replyText.trim()) {
      alert('Please enter a reply.');
      return;
    }

    const user = JSON.parse(
      localStorage.getItem('user') || '{"name":"User"}'
    );

    const comment = this.comments.find(
      item => item.id === commentId
    );

    if (!comment) {
      return;
    }

    comment.replies.push({
      id: Date.now(),
      text: this.replyText.trim(),
      author: user.name
    });

    this.saveComments();

    this.replyText = '';
    this.replyingTo = null;
  }

  saveComments() {
    const allComments = JSON.parse(
      localStorage.getItem('renthub-comments') || '{}'
    );

    allComments[this.apartment.id] = this.comments;

    localStorage.setItem(
      'renthub-comments',
      JSON.stringify(allComments)
    );
  }
}