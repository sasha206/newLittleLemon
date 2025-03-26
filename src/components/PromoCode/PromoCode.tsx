import { useState } from 'react';
import styled from 'styled-components';

const PromoContainer = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
`;

const PromoForm = styled.form`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const PromoInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const ActivateButton = styled.button`
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4f46e5;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const Message = styled.div<{ isError?: boolean }>`
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: ${props => props.isError ? '#ef4444' : '#059669'};
  background-color: ${props => props.isError ? '#fee2e2' : '#d1fae5'};
`;

const PromoCode = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (code === 'VALID123') {
        setMessage('Promo code successfully activated!');
        setIsError(false);
      } else {
        setMessage('Invalid promo code. Please try again.');
        setIsError(true);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PromoContainer>
      <h3>Activate Promo Code</h3>
      <PromoForm onSubmit={handleSubmit}>
        <PromoInput
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter promo code"
          disabled={isLoading}
        />
        <ActivateButton type="submit" disabled={!code || isLoading}>
          {isLoading ? 'Activating...' : 'Activate'}
        </ActivateButton>
      </PromoForm>
      {message && (
        <Message isError={isError}>{message}</Message>
      )}
    </PromoContainer>
  );
};

export default PromoCode;
