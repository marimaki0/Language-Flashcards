import React, { useState, useEffect } from 'react';
import { Flashcard } from '../types';
import styles from './AddForm.module.css';

interface AddFormProps {
  onSubmit: (cardData: Omit<Flashcard, 'id' | 'createdAt' | 'reviewCount' | 'correctCount' | 'incorrectCount'>) => Promise<void>;
  isSubmitting: boolean;
  existingCategories: string[];
  resetFormAfterSubmit?: boolean;
}

const AddForm: React.FC<AddFormProps> = ({
  onSubmit,
  isSubmitting,
  existingCategories,
  resetFormAfterSubmit = false
}) => {
  const [formData, setFormData] = useState({
    front: '',
    back: '',
    category: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard'
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  useEffect(() => {
    if (resetFormAfterSubmit && !isSubmitting) {
      const timer = setTimeout(() => {
        setFormData({
          front: '',
          back: '',
          category: '',
          difficulty: 'medium'
        });
        setErrors({});
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isSubmitting, resetFormAfterSubmit]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.front.trim()) {
      newErrors.front = 'Przód fiszki jest wymagany';
    } else if (formData.front.trim().length < 1) {
      newErrors.front = 'Przód fiszki musi mieć co najmniej 1 znak';
    } else if (formData.front.trim().length > 200) {
      newErrors.front = 'Przód fiszki nie może mieć więcej niż 200 znaków';
    }
    
    if (!formData.back.trim()) {
      newErrors.back = 'Tył fiszki jest wymagany';
    } else if (formData.back.trim().length < 1) {
      newErrors.back = 'Tył fiszki musi mieć co najmniej 1 znak';
    } else if (formData.back.trim().length > 500) {
      newErrors.back = 'Tył fiszki nie może mieć więcej niż 500 znaków';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Kategoria jest wymagana';
    } else if (formData.category.trim().length > 50) {
      newErrors.category = 'Kategoria nie może mieć więcej niż 50 znaków';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    
    try {
      await onSubmit({
        front: formData.front.trim(),
        back: formData.back.trim(),
        category: formData.category.trim(),
        difficulty: formData.difficulty
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
    setShowCategoryDropdown(false);
    
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  };

  const filteredCategories = existingCategories.filter(cat =>
    cat.toLowerCase().includes(formData.category.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className="form-group">
        <label htmlFor="front" className="form-label">
          Przód fiszki *
        </label>
        <input
          type="text"
          id="front"
          className={`form-input ${errors.front ? styles.error : ''}`}
          placeholder="np. Hello, Bonjour, Hola..."
          value={formData.front}
          onChange={(e) => handleInputChange('front', e.target.value)}
          disabled={isSubmitting}
          maxLength={200}
        />
        {errors.front && (
          <div className="form-error">{errors.front}</div>
        )}
        <div className={styles.charCount}>
          {formData.front.length}/200
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="back" className="form-label">
          Tył fiszki (tłumaczenie) *
        </label>
        <textarea
          id="back"
          className={`form-textarea ${errors.back ? styles.error : ''}`}
          placeholder="np. Cześć, Cześć (francuski), Cześć (hiszpański)..."
          value={formData.back}
          onChange={(e) => handleInputChange('back', e.target.value)}
          disabled={isSubmitting}
          rows={3}
          maxLength={500}
        />
        {errors.back && (
          <div className="form-error">{errors.back}</div>
        )}
        <div className={styles.charCount}>
          {formData.back.length}/500
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Kategoria *
        </label>
        <div className={styles.categoryInputContainer}>
          <input
            type="text"
            id="category"
            className={`form-input ${errors.category ? styles.error : ''}`}
            placeholder="np. Podstawowe, Czasowniki, Podróże..."
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            onFocus={() => setShowCategoryDropdown(true)}
            onBlur={() => {

              setTimeout(() => setShowCategoryDropdown(false), 200);
            }}
            disabled={isSubmitting}
            maxLength={50}
          />
          
          {showCategoryDropdown && filteredCategories.length > 0 && formData.category && (
            <div className={styles.categoryDropdown}>
              {filteredCategories.slice(0, 5).map((category, index) => (
                <button
                  key={index}
                  type="button"
                  className={styles.categoryOption}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors.category && (
          <div className="form-error">{errors.category}</div>
        )}
        <div className={styles.charCount}>
          {formData.category.length}/50
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Poziom trudności *</label>
        <div className={styles.difficultyOptions}>
          {[
            { value: 'easy', label: 'Łatwy', desc: 'Podstawowe słowa' },
            { value: 'medium', label: 'Średni', desc: 'Średnio trudne słowa' },
            { value: 'hard', label: 'Trudny', desc: 'Zaawansowane słowa' }
          ].map((option) => (
            <label key={option.value} className={styles.difficultyOption}>
              <input
                type="radio"
                name="difficulty"
                value={option.value}
                checked={formData.difficulty === option.value}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                disabled={isSubmitting}
              />
              <div className={styles.difficultyCard}>
                <div className={styles.difficultyLabel}>{option.label}</div>
                <div className={styles.difficultyDesc}>{option.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {(formData.front || formData.back) && (
        <div className={styles.preview}>
          <h4>Podgląd fiszki:</h4>
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <span className={`${styles.previewDifficulty} ${styles[formData.difficulty]}`}>
                {formData.difficulty}
              </span>
              {formData.category && (
                <span className={styles.previewCategory}>
                  {formData.category}
                </span>
              )}
            </div>
            <div className={styles.previewContent}>
              <div className={styles.previewFront}>
                {formData.front || 'Przód fiszki...'}
              </div>
              <div className={styles.previewDivider}>↔</div>
              <div className={styles.previewBack}>
                {formData.back || 'Tył fiszki...'}
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-large"
        disabled={isSubmitting || Object.keys(validateForm()).length > 0}
      >
        {isSubmitting ? (
          <>
            <span className="loader mr-2"></span>
            Dodawanie...
          </>
        ) : (
          'Dodaj fiszkę'
        )}
      </button>
    </form>
  );
};

export default AddForm;