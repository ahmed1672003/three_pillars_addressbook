import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { authInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
    let interceptor: typeof authInterceptor;
    let mockHandler: jasmine.SpyObj<HttpHandler>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        interceptor = authInterceptor;
        mockHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
    });

    it('should add Authorization header when token exists', () => {
        // Arrange
        const token = 'test-token';
        localStorage.setItem('accessToken', token);
        const request = new HttpRequest('GET', '/api/test');
        mockHandler.handle.and.returnValue(of({}));

        // Act
        interceptor(request, mockHandler).subscribe();

        // Assert
        expect(mockHandler.handle).toHaveBeenCalledWith(
            jasmine.objectContaining({
                headers: jasmine.objectContaining({
                    Authorization: `Bearer ${token}`
                })
            })
        );

        // Cleanup
        localStorage.removeItem('accessToken');
    });

    it('should not add Authorization header when no token exists', () => {
        // Arrange
        localStorage.removeItem('accessToken');
        const request = new HttpRequest('GET', '/api/test');
        mockHandler.handle.and.returnValue(of({}));

        // Act
        interceptor(request, mockHandler).subscribe();

        // Assert
        expect(mockHandler.handle).toHaveBeenCalledWith(request);
    });
});
