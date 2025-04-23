import { useState, useRef } from 'react';
import './AddCandidateForm.css';

interface AddCandidateFormProps {
  onAddCandidate: (candidate: {
    name: string;
    email: string;
    location: string;
    company: string;
    bio: string;
    image: string;
  }) => void;
}

const AddCandidateForm = ({ onAddCandidate }: AddCandidateFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    company: '',
    bio: '',
    image: ''
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Maximum dimensions
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;

          // Resize image while maintaining aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Convert to WebP format with quality 0.8
          const resizedImage = canvas.toDataURL('image/webp', 0.8);
          resolve(resizedImage);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = reader.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCandidate(formData);
    setFormData({
      name: '',
      email: '',
      location: '',
      company: '',
      bio: '',
      image: ''
    });
    setPreviewImage(null);
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const processedImage = await processImage(file);
        setPreviewImage(processedImage);
        setFormData(prev => ({
          ...prev,
          image: processedImage
        }));
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Failed to process image. Please try again.');
      }
    }
  };

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.click();
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const processedImage = await processImage(file);
          setPreviewImage(processedImage);
          setFormData(prev => ({
            ...prev,
            image: processedImage
          }));
        } catch (error) {
          console.error('Error processing image:', error);
          alert('Failed to process image. Please try again.');
        }
      }
    };
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewImage(null);
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  if (!isOpen) {
    return (
      <button className="add-candidate-button" onClick={() => setIsOpen(true)}>
        + Add New Candidate
      </button>
    );
  }

  return (
    <div className="add-candidate-form-overlay">
      <form className="add-candidate-form" onSubmit={handleSubmit}>
        <h2>
          {formData.name 
            ? `Adding ${formData.name}`
            : 'Add New Candidate'
          }
        </h2>

        {/* Image Upload Section */}
        <div className="image-upload-container">
          <div 
            className={`image-upload ${previewImage ? 'has-image' : ''}`}
            onClick={handleImageClick}
          >
            {previewImage ? (
              <>
                <img src={previewImage} alt="Preview" className="preview-image" />
                <button 
                  type="button" 
                  className="remove-image"
                  onClick={handleRemoveImage}
                >
                  ×
                </button>
              </>
            ) : (
              <div className="upload-placeholder">
                <span className="camera-icon">📸</span>
              </div>
            )}
          </div>
        </div>

        {/* Rest of the form fields */}
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter candidate's name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter candidate's email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="City, Country"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="Current company"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              placeholder="Brief description about the candidate"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">Add Candidate</button>
            <button type="button" className="cancel-button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCandidateForm; 