import styled from '@emotion/styled';

export const CommonPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;  /* Menambahkan sedikit ruang bawah */
`;

export const CommonPageContainer = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);  /* Menambahkan bayangan untuk efek 3D */
  transition: box-shadow 0.3s ease;  /* Efek transisi saat bayangan berubah */
  
  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);  /* Mengubah bayangan pada hover */
  }

  & h2 {
    font-size: 1.8rem;  /* Ukuran font yang lebih besar */
    color: #333333;  /* Warna teks yang lebih gelap */
    margin-bottom: 1rem;  /* Ruang bawah tambahan */
  }
`;

