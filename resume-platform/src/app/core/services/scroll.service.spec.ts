import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  let service: ScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrollService]
    });
    service = TestBed.inject(ScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should scroll to element when scrollToElement is called', () => {
    const mockElement = document.createElement('div');
    const scrollIntoViewSpy = spyOn(mockElement, 'scrollIntoView');

    service.scrollToElement(mockElement);

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });
  });

  it('should scroll to element by id', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'test-section';
    document.body.appendChild(mockElement);

    const scrollIntoViewSpy = spyOn(mockElement, 'scrollIntoView');

    service.scrollToSection('test-section');

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });

    document.body.removeChild(mockElement);
  });

  it('should handle missing element gracefully', () => {
    const consoleWarnSpy = spyOn(console, 'warn');
    service.scrollToSection('non-existent');
    expect(consoleWarnSpy).toHaveBeenCalledWith("Section with id 'non-existent' not found");
  });

  it('should scroll to top of page', () => {
    const scrollToSpy = spyOn(window, 'scrollTo').and.stub();
    service.scrollToTop();
    expect(scrollToSpy).toHaveBeenCalled();
    expect(scrollToSpy).toHaveBeenCalledTimes(1);
    const callArgs = scrollToSpy.calls.mostRecent().args[0] as ScrollToOptions;
    expect(callArgs.top).toBe(0);
    expect(callArgs.behavior).toBe('smooth');
  });
});
