
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './apartment-forms.html',
  styleUrl: './apartment-forms.css'
})
export class ApartmentForm {
  propertyType = '';
  propertyName = '';
  sharedProperty = 'No';

  title = '';
  city = '';
  address = '';
  rent: number | null = null;
  area: number | null = null;
  description = '';

  leaseType = 'Long term';
  negotiable = false;
  priceMode = 'Per Month';

  furnished = 'No';
  vegetarianPreference = 'No preference';

  contactName = '';
  contactPhone = '';

  availableAmenities = [
    'Gym/Fitness Center',
    'Swimming Pool',
    'Car Park',
    'Visitors Parking',
    'Power Backup',
    'Garbage Disposal',
    'Private Lawn',
    'Water Heater',
    'Plant Security System',
    'Laundry Service',
    'Elevator',
    'Club House'
  ];

  selectedAmenities: string[] = [];
  imagePreview = '';
  showPreview = false;

  constructor(private router: Router) {}

  toggleAmenity(amenity: string, checked: boolean) {
    if (checked && !this.selectedAmenities.includes(amenity)) {
      this.selectedAmenities.push(amenity);
    } else if (!checked) {
      this.selectedAmenities = this.selectedAmenities.filter(
        item => item !== amenity
      );
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image.');
      input.value = '';
      return;
    }

    // Limit each image to 1 MB for localStorage.
    if (file.size > 1024 * 1024) {
      alert('Image size must be less than 1 MB.');
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.onerror = () => {
      alert('Unable to read the selected image.');
      this.imagePreview = '';
      input.value = '';
    };

    reader.readAsDataURL(file);
  }

  previewProperty() {
    if (
      !this.propertyType ||
      !this.propertyName.trim() ||
      !this.address.trim() ||
      !this.city.trim() ||
      this.area === null ||
      !Number.isFinite(Number(this.area)) ||
      this.area <= 0 ||
      this.rent === null ||
      !Number.isFinite(Number(this.rent)) ||
      this.rent <= 0 ||
      !this.title.trim() ||
      !this.description.trim() ||
      this.description.length > 1400 ||
      !this.contactName.trim() ||
      !/^[0-9]{10}$/.test(this.contactPhone) ||
      !this.imagePreview
    ) {
      alert(
        'Please complete all required fields, enter a valid ' +
        '10-digit contact number, and upload an image.'
      );
      return;
    }

    this.showPreview = true;
  }

  editProperty() {
    this.showPreview = false;
  }

  submitProperty() {
    if (!this.showPreview || !this.imagePreview) {
      alert('Please preview your property and upload an image first.');
      return;
    }

    try {
      const properties = JSON.parse(
        localStorage.getItem('properties') || '[]'
      );

      if (!Array.isArray(properties)) {
        alert('Invalid saved property data.');
        return;
      }

      const user = JSON.parse(
        localStorage.getItem('user') || '{"email":""}'
      );

      const property = {
        id: Date.now(),

        propertyType: this.propertyType,
        propertyName: this.propertyName.trim(),
        sharedProperty: this.sharedProperty,

        title: this.title.trim(),
        city: this.city.trim(),
        address: this.address.trim(),
        location: `${this.address.trim()}, ${this.city.trim()}`,

        rent: Number(this.rent),
        area: Number(this.area),
        description: this.description.trim(),

        leaseType: this.leaseType,
        negotiable: this.negotiable,
        priceMode: this.priceMode,

        image: this.imagePreview,
        amenities: [...this.selectedAmenities],
        furnished: this.furnished,
        vegetarianPreference: this.vegetarianPreference,

        contactName: this.contactName.trim(),
        contactPhone: this.contactPhone.trim(),

        ownerEmail: user.email || ''
      };

      properties.push(property);

      localStorage.setItem(
        'properties',
        JSON.stringify(properties)
      );

      alert('Property posted successfully!');
      this.router.navigate(['/']);

    } catch {
      alert(
        'Unable to save the property. Browser storage may be full.'
      );
    }
  }
}
