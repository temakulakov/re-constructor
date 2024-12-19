import { AImageBlock } from 'src/__generated__/graphql';
import { formatAssetUrl } from '~utils/formatAssetUrl';
import { Container, Wrapper, Background, Image } from './styles';

export const ImageBlock = ({ backgroundColor, image }: AImageBlock) => {
  return (
    <Container>
      {backgroundColor && <Background color={backgroundColor} />}
      <Wrapper>
        {image && <Image src={formatAssetUrl({ url: image })} />}
      </Wrapper>
    </Container>
  );
};
