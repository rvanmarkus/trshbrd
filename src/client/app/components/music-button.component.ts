import { Component } from 'angular2/core';
import { Input, AfterViewInit, OnInit } from 'angular2/core';
import { NgStyle} from 'angular2/common';
import {Observable} from 'Rxjs/Rx';

enum PlayerState {
	Empty,
	Loaded,
	Playing,
	Paused,
	Ended,
	Error
}
interface CanPlayThroughEvent extends Event {
	target: HTMLAudioElement;
}
@Component({
	selector: 'music-button',
	templateUrl: 'app/components/music-button.component.html',
	directives: [NgStyle],
	styleUrls: ['app/components/music-button.component.css'],
})
export class MusicButtonComponent implements AfterViewInit, OnInit {
	@Input() music: string;

	duration: number = 0;
	stateUpdates: Observable<PlayerState>;
	lastTimeUpdate: number = 0;
	state: PlayerState;
	player = new Audio();

	ngOnInit() {
		let playerLoadingReady = Observable.fromEvent(this.player, 'canplaythrough')
			.first();

		this.stateUpdates = playerLoadingReady.map(() => PlayerState.Loaded)
			.merge(Observable.fromEvent(this.player, 'play').map(() => PlayerState.Playing))
			.merge(Observable.fromEvent(this.player, 'pause').map(() => PlayerState.Paused))
			.merge(Observable.fromEvent(this.player, 'ended').map(() => PlayerState.Ended));

		playerLoadingReady.subscribe((loadEvent : CanPlayThroughEvent) => {
			this.duration = loadEvent.target.duration;
		});
	}

	ngAfterViewInit() {
		this.player.src = this.music || '/assets/audio/sample.mp3';
		this.player.load();

		this.stateUpdates.subscribe(state => {
			this.state = state;
		});
	}


	onButtonClick() {
		this.toggleMusic();
	}

	toggleMusic() {
		if(this.state === PlayerState.Playing) {
			this.player.currentTime = 0;
			this.duration = this.player.duration;
			this.player.pause();
		} else {
			this.player.play();
		}
	}


	getPlayAnimation() {
		// console.log('not playing',Math.round((this.lastTimeUpdate / this.duration)* 100));
		let style =  `
			background: linear-gradient(to right, rgba(255, 255, 255, 0.5) 50%, transparent 50%);
			background-position: 0% bottom;
				background-size: 200% 100%;
				${this.state === PlayerState.Playing ?
				`animation: progressFill ${Math.abs(this.duration)}s -.1s ease-in-out forwards;` :''}`;
		// console.log('style',style);
		return style;
	}
}
