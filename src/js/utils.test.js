import { randomIntFromRange, randomColor, distance } from "./utils"



describe( 'test for canvas.js', () => {

    test('randomIntFromRange should return an int between 1-9', () => {
      const min = 1;
      const max = 9
      const num = randomIntFromRange(min, max);
      expect(num).toBeGreaterThanOrEqual(min);
      expect(num).toBeLessThanOrEqual(max);
    })

    test('randomColor should return one of the mockColors', () => {
      const mockColors = ['red', 'green', 'blue'];
      const color = randomColor(mockColors);
      expect(mockColors).toContain(color);
    })

} )