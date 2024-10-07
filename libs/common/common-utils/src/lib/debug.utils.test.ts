import { DebugUitls } from './debug.utils';
import { UnitUtils } from './unit.utils';

jest.mock('./unit.utils');

describe('DebugUitls', () => {
  describe('getMemoryUsageHumanReadable', () => {
    it('should return memory usage in human-readable format', () => {
      const mockMemoryUsage = {
        heapUsed: 12345678,
        heapTotal: 23456789,
        arrayBuffers: 3456789,
        external: 4567890,
        rss: 5678901,
      };

      jest.spyOn(process, 'memoryUsage').mockReturnValue(mockMemoryUsage as any);
      (UnitUtils.convertBytesToHumanReadableString as jest.Mock).mockImplementation(
        (bytes: number) => `${bytes} bytes`
      );

      const result = DebugUitls.getMemoryUsageHumanReadable();

      expect(result).toEqual({
        heapUsed: '12345678 bytes',
        heapTotal: '23456789 bytes',
        arrayBuffers: '3456789 bytes',
        external: '4567890 bytes',
        rss: '5678901 bytes',
      });

      expect(UnitUtils.convertBytesToHumanReadableString).toHaveBeenCalledWith(12345678);
      expect(UnitUtils.convertBytesToHumanReadableString).toHaveBeenCalledWith(23456789);
      expect(UnitUtils.convertBytesToHumanReadableString).toHaveBeenCalledWith(3456789);
      expect(UnitUtils.convertBytesToHumanReadableString).toHaveBeenCalledWith(4567890);
      expect(UnitUtils.convertBytesToHumanReadableString).toHaveBeenCalledWith(5678901);
    });
  });
});
