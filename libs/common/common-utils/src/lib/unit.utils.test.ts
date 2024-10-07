import { UnitUtils } from './unit.utils';

describe('UnitUtils', () => {
  describe('convertBytesToHumanReadable', () => {
    it('should return 0 Bytes for 0 input', () => {
      const result = UnitUtils.convertBytesToHumanReadable(0);
      expect(result).toEqual({ value: 0, unit: 'Bytes' });
    });

    it('should convert bytes to KB', () => {
      const result = UnitUtils.convertBytesToHumanReadable(1024);
      expect(result).toEqual({ value: 1, unit: 'KB' });
    });

    it('should convert bytes to MB', () => {
      const result = UnitUtils.convertBytesToHumanReadable(1024 * 1024);
      expect(result).toEqual({ value: 1, unit: 'MB' });
    });

    it('should convert bytes to GB', () => {
      const result = UnitUtils.convertBytesToHumanReadable(1024 * 1024 * 1024);
      expect(result).toEqual({ value: 1, unit: 'GB' });
    });

    it('should convert bytes to TB', () => {
      const result = UnitUtils.convertBytesToHumanReadable(1024 * 1024 * 1024 * 1024);
      expect(result).toEqual({ value: 1, unit: 'TB' });
    });

    it('should convert bytes to PB', () => {
      const result = UnitUtils.convertBytesToHumanReadable(1024 * 1024 * 1024 * 1024 * 1024);
      expect(result).toEqual({ value: 1, unit: 'PB' });
    });

    it('should handle fractional digits', () => {
      const result = UnitUtils.convertBytesToHumanReadable(1500, 3);
      expect(result).toEqual({ value: 1.465, unit: 'KB' });
    });
  });

  describe('convertBytesToHumanReadableString', () => {
    it('should return "0 Bytes" for 0 input', () => {
      const result = UnitUtils.convertBytesToHumanReadableString(0);
      expect(result).toBe('0 Bytes');
    });

    it('should convert bytes to human-readable string in KB', () => {
      const result = UnitUtils.convertBytesToHumanReadableString(1024);
      expect(result).toBe('1 KB');
    });

    it('should convert bytes to human-readable string in MB', () => {
      const result = UnitUtils.convertBytesToHumanReadableString(1024 * 1024);
      expect(result).toBe('1 MB');
    });

    it('should convert bytes to human-readable string in GB', () => {
      const result = UnitUtils.convertBytesToHumanReadableString(1024 * 1024 * 1024);
      expect(result).toBe('1 GB');
    });

    it('should convert bytes to human-readable string in TB', () => {
      const result = UnitUtils.convertBytesToHumanReadableString(1024 * 1024 * 1024 * 1024);
      expect(result).toBe('1 TB');
    });

    it('should convert bytes to human-readable string in PB', () => {
      const result = UnitUtils.convertBytesToHumanReadableString(1024 * 1024 * 1024 * 1024 * 1024);
      expect(result).toBe('1 PB');
    });

    it('should handle fractional digits in string', () => {
      const result = UnitUtils.convertBytesToHumanReadableString(1500, 3);
      expect(result).toBe('1.465 KB');
    });
  });
});
